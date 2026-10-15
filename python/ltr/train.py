"""검색 순서 학습 숙제 (AI 검색 2-5 ②) - search:ltr-train(PHP)이 매주 부름. 서버가 아니라 한 번 돌고 끝남.

PHP가 만든 숫자 표를 읽어 (재료 계산은 PHP SearchLtr 한 곳에서만)
  train.csv = 교재, exam.csv = 시험지 (줄 = 문제 번호, 무게, 고른 점수, 본 자리, 검색어 번호, 재료들)
  meta.json = 재료 이름·상식 울타리·자리별 클릭률·검색어 목록
  1. XGBoost(rank:ndcg) 학습 → model_new.json
  2. 시험지 채점 (ES 순서 / 지금 모델 / 새 모델) → report.json
  3. PHP 나무 계산과 맞춰 볼 정답지 → check.csv (재료들 + 점수)

web01: /opt/4science-ltr/venv/bin/python - 설치는 requirements.txt 참고
"""
import argparse
import json
import time
import warnings

warnings.filterwarnings("ignore", category=FutureWarning)   # xgboost "glibc 2.28 미만 지원 중단 예정" 안내 - 3.0.5에 고정해서 씀

import numpy as np
import xgboost as xgb

COLS = 5            # 앞 칸: qid, weight, label, pos, kw
K = 15              # 채점 범위 = 검색 결과 1쪽
ROUNDS = 400        # 나무 최대 그루
EARLY = 30          # 확인용 문제 점수가 이만큼 그루 동안 안 오르면 멈춤
CHECK_ROWS = 300    # PHP 계산과 맞춰 볼 줄 수
PARAMS = {
    "objective": "rank:ndcg",
    "eval_metric": f"ndcg@{K}",
    "eta": 0.05,
    "max_depth": 4,             # 얕은 나무 - 기록이 적을 때 외워 버리지 않게
    "min_child_weight": 1,
    "subsample": 1.0,
    "tree_method": "hist",
    "nthread": 2,               # web01 4코어 중 2개만
    "seed": 0,
}


def load(path, nfeat):
    a = np.loadtxt(path, delimiter=",", skiprows=1, ndmin=2)
    if a.size == 0:
        a = np.zeros((0, COLS + nfeat))
    return {
        "qid": a[:, 0].astype(np.int64),
        "w": a[:, 1],
        "y": a[:, 2],
        "pos": a[:, 3].astype(np.int64),
        "kw": a[:, 4].astype(np.int64),
        "X": a[:, COLS:].astype(np.float32),
    }


def bounds(qid):
    """문제마다 [시작, 끝) 줄 번호 (같은 문제는 붙어 있음)"""
    if len(qid) == 0:
        return np.zeros(0, np.int64), np.zeros(0, np.int64)
    s = np.flatnonzero(np.r_[True, qid[1:] != qid[:-1]])
    return s, np.r_[s[1:], len(qid)]


def take(d, lo, hi):
    """lo~hi 번째 문제만 (줄 단위로 잘라냄)"""
    s, e = bounds(d["qid"])
    a, b = s[lo], e[hi - 1]
    return {k: v[a:b] for k, v in d.items()}


def dmatrix(d, names):
    s, _ = bounds(d["qid"])
    return xgb.DMatrix(d["X"], label=d["y"], qid=d["qid"], weight=d["w"][s], feature_names=names, missing=np.nan)


def bucket(pos):
    """자리 묶음 - PHP SearchRank::bucket과 같음"""
    return pos if pos <= 15 else (16 if pos <= 30 else (31 if pos <= 60 else 61))


def ndcg(order_keys, gains):
    """order_keys 순서(작은 값이 앞)로 놓았을 때 nDCG@K"""
    disc = 1 / np.log2(np.arange(2, K + 2))
    g = gains[np.lexsort(order_keys[::-1])][:K]
    ideal = np.sort(gains)[::-1][:K]
    best = (ideal * disc[: len(ideal)]).sum()
    return (g * disc[: len(g)]).sum() / best if best > 0 else 0.0


def exam(d, preds, meta, names):
    """시험 채점 - 순서마다 [자리 덕 보정 점수, 그냥 점수] 평균 (문제 무게), 검색어별 자리 보정 점수"""
    ctr = {int(k): v for k, v in meta["ctr"].items()}
    top = ctr.get(1) or 1.0
    i_rank, i_score = names.index("es_rank"), names.index("es_score")
    s, e = bounds(d["qid"])
    tot = {k: {"ips": 0.0, "plain": 0.0} for k in preds}
    per_kw = {}
    wsum = 0.0
    for a, b in zip(s, e):
        y, w = d["y"][a:b], d["w"][a]
        plain = 2 ** y - 1
        prop = np.array([min(1.0, max(0.1, ctr.get(bucket(int(p)), 0) / top)) for p in d["pos"][a:b]])
        ips = plain / prop          # 아래 자리에서 고른 건 더 쳐줌 (1등 자리라서 눌린 클릭은 덜 쳐줌)
        rank, score = d["X"][a:b, i_rank], d["X"][a:b, i_score]
        kw = int(d["kw"][a])
        per_kw.setdefault(kw, {"n": 0, "w": 0.0, **{k: 0.0 for k in preds}})
        per_kw[kw]["n"] += 1
        per_kw[kw]["w"] += w
        for k, p in preds.items():
            keys = (rank, -score) if p is None else (-p[a:b], rank)     # ES 순서 = 등수, 모델 = 점수 높은 순 (같으면 ES 등수)
            v_ips, v_plain = ndcg(np.array(keys), ips), ndcg(np.array(keys), plain)
            tot[k]["ips"] += w * v_ips
            tot[k]["plain"] += w * v_plain
            per_kw[kw][k] += w * v_ips
        wsum += w
    res = {k: {m: round(v / wsum, 5) for m, v in x.items()} for k, x in tot.items()}
    kws = sorted(per_kw.items(), key=lambda t: -t[1]["n"])[:30]
    return res, [
        {"kw": meta["keywords"][kw], "groups": x["n"], **{k: round(x[k] / x["w"], 4) for k in preds}} for kw, x in kws
    ]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", required=True, help="숙제 폴더 (storage/app/ltr/work)")
    ap.add_argument("--current", help="지금 쓰는 모델 (있으면 같이 채점)")
    args = ap.parse_args()
    t0 = time.time()

    meta = json.load(open(f"{args.dir}/meta.json", encoding="utf-8"))
    names = meta["features"]
    train = load(f"{args.dir}/train.csv", len(names))
    test = load(f"{args.dir}/exam.csv", len(names))
    params = dict(PARAMS, monotone_constraints="(" + ",".join(str(m) for m in meta["monotone"]) + ")")

    # 몇 그루 키울지: 교재의 마지막 15%(가장 최근)를 확인용 문제로 떼어 보고 정함 → 교재 전체로 그 그루 수만큼 다시 학습
    n = len(bounds(train["qid"])[0])
    cut = int(n * 0.85)
    rounds, valid = 100, False
    if n >= 400 and n - cut >= 50:
        bst = xgb.train(params, dmatrix(take(train, 0, cut), names), ROUNDS,
                        evals=[(dmatrix(take(train, cut, n), names), "valid")], early_stopping_rounds=EARLY, verbose_eval=False)
        rounds, valid = bst.best_iteration + 1, True
    bst = xgb.train(params, dmatrix(train, names), rounds)
    bst.save_model(f"{args.dir}/model_new.json")

    # 채점
    dx = xgb.DMatrix(test["X"], feature_names=names, missing=np.nan)
    preds = {"es": None, "new": bst.predict(dx)}
    if args.current:
        cur = xgb.Booster()
        cur.load_model(args.current)
        if cur.feature_names == names:
            preds["current"] = cur.predict(dx)
    scores, keywords = exam(test, preds, meta, names)
    scores.setdefault("current", None)
    for k in keywords:
        k.setdefault("current", None)

    # PHP 나무 계산 정답지 - 시험지 앞 줄들의 재료 + 새 모델 점수
    m = min(CHECK_ROWS, len(test["X"]))
    np.savetxt(f"{args.dir}/check.csv", np.c_[test["X"][:m], preds["new"][:m]], delimiter=",", fmt="%.9g",
               header=",".join(names + ["pred"]), comments="")

    gain = bst.get_score(importance_type="total_gain")
    report = {
        "train": {"groups": n, "rows": int(len(train["y"])), "rounds": rounds, "valid": valid},
        "exam": {"groups": int(len(bounds(test["qid"])[0])), "rows": int(len(test["y"]))},
        "ndcg": scores,
        "keywords": keywords,
        "importance": {k: round(v, 1) for k, v in sorted(gain.items(), key=lambda t: -t[1])[:10]},
        "seconds": round(time.time() - t0, 1),
        "xgboost": xgb.__version__,
    }
    json.dump(report, open(f"{args.dir}/report.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(json.dumps({"ndcg": scores, "rounds": rounds, "seconds": report["seconds"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
