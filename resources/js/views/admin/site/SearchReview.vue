<template>
    <div class="review-wrap">
        <h2 class="page-title">AI 검색 검수</h2>

        <div class="tabs">
            <button :class="{ on: tab === 'ai' }" @click="go('ai')">AI 수첩 <small v-if="ai.counts.N">검수 안 함 {{ num(ai.counts.N) }}</small></button>
            <button :class="{ on: tab === 'attr' }" @click="go('attr')">상품 속성 <small v-if="attr.todo.goods">검수 대상 {{ num(attr.todo.goods) }}개 상품 · {{ num(attr.todo.rows) }}줄</small></button>
        </div>

        <!-- 탭 A AI 수첩 -->
        <div v-if="tab === 'ai'" class="card">
            <p class="hint">손님이 결과가 적은 검색을 했을 때 AI가 "바꾼 말"로 함께 찾아 보여 줍니다. [보정 안 함]을 누르면 그 검색어는 바로 보정을 멈추고 AI에게 다시 묻지도 않습니다 (엉뚱한 검색어·우리 가게에 없는 상품 등).
                검색·보정 횟수는 최근 {{ ai.logDays }}일.</p>
            <div class="search-row">
                <select v-model="ai.q.checked" class="form-input" @change="aiFetch(1)">
                    <option value="N">검수 안 함</option><option value="Y">사용 중</option><option value="X">보정 안 함</option><option value="all">전체</option>
                </select>
                <select v-model="ai.q.status" class="form-input" @change="aiFetch(1)">
                    <option value="">상태 전체</option><option value="ok">ok 쓸 답 있음</option><option value="empty">empty 답 없음</option><option value="bad">bad 검증 탈락</option>
                </select>
                <select v-model="ai.q.sort" class="form-input" @change="aiFetch(1)">
                    <option value="alt">보정 많이 쓴 순</option><option value="search">검색 많은 순</option><option value="new">최근 순</option>
                </select>
                <input v-model="ai.q.search" class="search-input" placeholder="검색어 찾기" @keyup.enter="aiFetch(1)" />
                <button class="btn btn-primary" @click="aiFetch(1)">찾기</button>
            </div>

            <p v-if="!ai.list.length" class="empty">해당하는 줄이 없습니다.</p>
            <div v-for="it in ai.list" :key="it.id" class="review-item">
                <div class="row-head">
                    <div>
                        <b class="kw">{{ it.text }}</b>
                        <span class="badge" :class="'st-' + it.status">{{ it.status }}</span>
                        <span v-if="it.checked !== 'N'" class="badge" :class="it.checked === 'Y' ? 'ck-y' : 'st-empty'">{{ it.checked === 'Y' ? '사용 중' : '보정 안 함' }}</span>
                        <span v-if="it.queued" class="badge st-wait">{{ it.queued === 'wait' ? '다시 묻는 중' : '다시 묻기 실패' }}</span>
                        <span class="muted">검색 {{ num(it.cnt) }}번 · 보정 {{ num(it.alt_cnt) }}번</span>
                    </div>
                    <div v-if="edit.id !== it.id" class="btns">
                        <button class="btn-sm ok" @click="aiCheck(it, 'Y')" title="첫 번째 바꾼 말이 맞음 - 계속 씀, AI가 다시 덮어쓰지 않음">이대로 사용</button>
                        <button class="btn-sm ng" @click="aiCheck(it, 'X')" title="이 검색어는 보정하지 않음 - AI에게 다시 묻지도 않음 (나중에 직접 고치기·AI에 다시 묻기로 살릴 수 있음)">보정 안 함</button>
                        <button class="btn-sm" @click="aiEdit(it)" title="바꾼 말을 직접 고쳐 씀">직접 고치기</button>
                        <button class="btn-sm" @click="aiAsk(it)" title="AI에 새로 물어봄 (1분 안에 새 답)">AI에 다시 묻기</button>
                    </div>
                </div>

                <!-- 보기 -->
                <template v-if="edit.id !== it.id">
                    <div class="line">
                        <span class="label">바꾼 말</span>
                        <span v-for="(a, i) in it.alts" :key="a.q" class="chip" :class="{ main: i === 0 }" :title="i === 0 ? '손님 검색에 실제로 쓰는 말' : '예비 (지금은 안 씀)'">{{ a.q }} · {{ num(a.hits) }}건</span>
                        <span v-if="!it.alts.length" class="muted">없음</span>
                    </div>
                    <div v-if="it.maker || it.attrs.length" class="line">
                        <span class="label">알아낸 것</span>
                        <span v-if="it.maker" class="chip gray">제조사 {{ it.maker }}</span>
                        <span v-for="a in it.attrs" :key="a" class="chip gray">{{ a }}</span>
                    </div>
                    <div v-if="it.dropped" class="line muted"><span class="label">버린 것</span>{{ it.dropped }}</div>
                    <div class="line muted small">{{ it.model }} · {{ it.updated_at }}<template v-if="it.checked_at"> · 검수 {{ it.checked_at }}</template></div>
                </template>

                <!-- 직접 고치기 -->
                <div v-else class="edit-box">
                    <p class="hint">바꾼 말 (최대 3개, 첫 번째를 손님 검색에 씀). 상품 수는 그 말이 그대로 들어간 손님 노출 상품 수.</p>
                    <div v-for="(v, i) in edit.alts" :key="i" class="alt-row">
                        <input v-model="edit.alts[i]" class="form-input" :placeholder="i === 0 ? '예) methanol' : ''" @input="edit.counted = null" />
                        <span v-if="edit.counted && countOf(v) !== null" :class="countOf(v) > edit.counted.base ? 'good' : 'warn'">
                            {{ num(countOf(v)) }}건<template v-if="countOf(v) <= edit.counted.base"> (원래 {{ num(edit.counted.base) }}건보다 많지 않음)</template>
                        </span>
                    </div>
                    <div class="btns">
                        <button class="btn-sm" @click="aiCount(it)">상품 수 확인</button>
                        <button class="btn-sm ok" @click="aiFix(it)">저장 (사용)</button>
                        <button class="btn-sm" @click="edit.id = null">취소</button>
                    </div>
                </div>
            </div>
            <div class="pagination" v-if="ai.last > 1">
                <button class="page-btn" :disabled="ai.page === 1" @click="aiFetch(ai.page - 1)">❮</button>
                <span class="page-now">{{ ai.page }} / {{ ai.last }}</span>
                <button class="page-btn" :disabled="ai.page === ai.last" @click="aiFetch(ai.page + 1)">❯</button>
            </div>
        </div>

        <!-- 탭 B 상품 속성 -->
        <div v-if="tab === 'attr'" class="card">
            <p class="hint">규칙이 규격 글자에서 값을 여러 개 뽑아 확실하지 않은 모델들입니다. 모델마다 속성 값이 모두 보입니다.<br>
                <span class="chip ck-y">초록</span> 이 모델의 진짜 값 → 검색에 씀 · <span class="chip ck-x">빨강</span> 아닌 값 → 안 씀.
                처음엔 모두 초록이니 <b>아닌 값만 눌러 빨강</b>, 숫자가 틀렸으면 [값 고치기], 빠진 값은 [+ 값 추가] → [이 상품 저장].</p>
            <div class="search-row">
                <select v-model="attr.q.state" class="form-input" @change="attrFetch(1)">
                    <option value="todo">검수 대상</option><option value="done">검수 끝</option>
                </select>
                <select v-model="attr.q.key" class="form-input" @change="attrFetch(1)">
                    <option value="">속성 전체</option>
                    <option v-for="(d, k) in attr.defs" :key="k" :value="k">{{ d.name }}</option>
                </select>
                <input v-model="attr.q.search" class="search-input" placeholder="상품 번호 또는 상품명" @keyup.enter="attrFetch(1)" />
                <button class="btn btn-primary" @click="attrFetch(1)">찾기</button>
            </div>

            <p v-if="!attr.list.length" class="empty">해당하는 상품이 없습니다.</p>
            <div v-for="g in attr.list" :key="g.gd_id" class="review-item">
                <div class="row-head">
                    <div>
                        <router-link :to="{ name: 'adm_goods_edit', params: { gd_id: g.gd_id } }" target="_blank" class="kw">{{ g.gd_id }} · {{ g.gd_name }}</router-link>
                        <span v-if="g.enable !== 'Y'" class="badge st-bad">숨김</span>
                        <span class="muted">{{ g.maker }} · 모델 {{ g.models.length }}개 · 확인 필요 {{ g.cnt }}줄</span>
                    </div>
                    <div class="btns">
                        <button class="btn-sm" @click="pickAll(g, 'Y')">모두 초록</button>
                        <button class="btn-sm" @click="pickAll(g, 'X')">모두 빨강</button>
                        <button class="btn-sm ok" @click="attrSave(g)">이 상품 저장</button>
                    </div>
                </div>
                <table class="table">
                    <colgroup><col style="width:26%"><col style="width:38%"><col></colgroup>
                    <tbody>
                        <tr v-for="m in g.models" :key="m.gm_id">
                            <td>
                                <div>{{ m.name }}</div>
                                <div class="muted small">{{ m.code }} {{ m.catno }}</div>
                            </td>
                            <td class="spec" :title="m.spec">{{ m.spec || '(규격 없음)' }}</td>
                            <td>
                                <div v-for="a in m.attrs" :key="a.ga_id" class="pick-row">
                                    <span class="chip pick" :class="pickClass(a)" :title="'신뢰도 ' + a.ga_conf + ' · ' + a.ga_from + ' · ' + a.ga_raw" @click="cycle(a)">
                                        {{ defName(a.ga_key) }} {{ label(a) }}<template v-if="a.ga_source === 'manual'"> ✎</template>
                                    </span>
                                    <template v-if="fix[a.ga_id] !== undefined">
                                        <input v-model="fix[a.ga_id]" class="form-input fix" :placeholder="'예) ' + example(a.ga_key)" @input="$set(pick, a.ga_id, 'Y')" />
                                        <a class="link" @click="unfix(a)">취소</a>
                                    </template>
                                    <a v-else class="link" @click="$set(fix, a.ga_id, label(a))">값 고치기</a>
                                    <span v-if="a.ga_from === 'gm_name'" class="muted small">모델명에서</span>
                                </div>
                                <!-- 빠진 값 추가 -->
                                <div v-for="(n, i) in adds[m.gm_id] || []" :key="'add' + i" class="pick-row">
                                    <select v-model="n.key" class="form-input add-key">
                                        <option v-for="(d, k) in attr.defs" :key="k" :value="k">{{ d.name }}</option>
                                    </select>
                                    <input v-model="n.value" class="form-input fix" :placeholder="'예) ' + example(n.key)" />
                                    <a class="link" @click="adds[m.gm_id].splice(i, 1)">빼기</a>
                                </div>
                                <a class="link" @click="addRow(m)">+ 값 추가</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination" v-if="attr.last > 1">
                <button class="page-btn" :disabled="attr.page === 1" @click="attrFetch(attr.page - 1)">❮</button>
                <span class="page-now">{{ attr.page }} / {{ attr.last }}</span>
                <button class="page-btn" :disabled="attr.page === attr.last" @click="attrFetch(attr.page + 1)">❯</button>
            </div>
        </div>
    </div>
</template>

<script>
import ax from '@/api/http';


export default {
    data() {
        return {
            tab: this.$route.query.tab === 'attr' ? 'attr' : 'ai',
            ai: { q: { checked: 'N', status: '', sort: 'alt', search: '' }, list: [], page: 1, last: 1, counts: {}, logDays: 30 },
            edit: { id: null, alts: [], counted: null },
            attr: { q: { state: 'todo', key: '', search: '' }, list: [], page: 1, last: 1, defs: {}, todo: {} },
            pick: {},       //  ga_id → 'Y' | 'X' (화면에서 고른 판정)
            fix: {},        //  ga_id → 고친 값
            adds: {},       //  gm_id → [{key, value}] 새로 넣을 값
        }
    },
    methods: {
        num(n) { return Number(n || 0).toLocaleString(); },
        go(tab) {
            this.tab = tab;
            if (this.$route.query.tab !== tab)
                this.$router.replace({ query: { tab } });
            tab === 'ai' ? this.aiFetch(this.ai.page) : this.attrFetch(this.attr.page);
        },
        fail(res) {
            if (res && res.data && res.data.ok)
                return false;
            if (res && res.data && res.data.message)
                alert(res.data.message);
            return true;
        },

        //  ───── 탭 A AI 수첩 ─────
        async aiFetch(page) {
            const res = await ax.get('/api/admin/site/searchReview/ai', { params: { ...this.ai.q, page } });
            if (!res) return;
            Object.assign(this.ai, { list: res.data.list, page, last: res.data.last_page, counts: res.data.counts, logDays: res.data.log_days });
            this.edit.id = null;
        },
        async aiCheck(it, checked) {
            if (this.fail(await ax.patch(`/api/admin/site/searchReview/ai/${it.id}`, { checked }))) return;
            this.aiFetch(this.ai.page);
        },
        async aiAsk(it) {
            if (!confirm(`"${it.text}"를 AI에 다시 물을까요? (1분 안에 새 답으로 바뀜, 그때까지는 지금 답을 씀)`)) return;
            if (this.fail(await ax.post(`/api/admin/site/searchReview/ai/${it.id}/ask`))) return;
            this.aiFetch(this.ai.page);
        },
        aiEdit(it) {
            const alts = it.alts.map(a => a.q);
            while (alts.length < 3) alts.push('');
            this.edit = { id: it.id, alts, counted: null };
        },
        countOf(v) {
            const a = this.edit.counted.alts.find(x => x.q === String(v).trim().toLowerCase());
            return a ? a.hits : null;
        },
        async aiCount(it) {
            const res = await ax.post('/api/admin/site/searchReview/ai/count', { text: it.text, alts: this.edit.alts });
            if (this.fail(res)) return;
            this.edit.counted = res.data;
        },
        async aiFix(it) {
            const alts = this.edit.alts.filter(v => v.trim());
            if (!alts.length && !confirm('바꾼 말을 모두 비웠습니다. 이 검색어는 보정하지 않게 됩니다. 저장할까요?')) return;
            const res = await ax.put(`/api/admin/site/searchReview/ai/${it.id}`, { alts });
            if (this.fail(res)) return;
            const weak = res.data.alts.filter(a => a.hits === 0).map(a => a.q);
            if (weak.length) alert(`저장했습니다. 단, 상품이 0건인 말이 있습니다: ${weak.join(', ')}`);
            this.aiFetch(this.ai.page);
        },

        //  ───── 탭 B 상품 속성 ─────
        async attrFetch(page) {
            const res = await ax.get('/api/admin/site/searchReview/attr', { params: { ...this.attr.q, page } });
            if (!res) return;
            Object.assign(this.attr, { list: res.data.list, page, last: res.data.last_page, defs: res.data.defs, todo: res.data.todo });
            this.pick = {};
            this.fix = {};
            this.adds = {};
        },
        defName(key) { return (this.attr.defs[key] || {}).name || key; },
        example(key) { return { volume: '500ml, 1-10ul', purity: '≥99.5%', pack_mass: '100mg', outer_size: '440x264x117mm', inner_size: '300x200mm', purity_method: 'HPLC' }[key] || ''; },
        //  보기 좋은 단위로 (저장 값은 기준 단위 그대로) - 0.0005-0.01ml → 0.5-10ul, 5000mg → 5g
        label(a) {
            if (a.ga_num === null) return a.ga_value;
            const n = Number(a.ga_num), x = a.ga_num_max === null ? null : Number(a.ga_num_max), top = x === null ? n : x;
            let [rate, unit] = [1, a.ga_unit || ''];
            if (unit === 'ml' && top < 1)        [rate, unit] = [0.001, 'ul'];
            else if (unit === 'ml' && n >= 1000) [rate, unit] = [1000, 'L'];
            else if (unit === 'mg' && top < 1)   [rate, unit] = [0.001, 'ug'];
            else if (unit === 'mg' && n >= 1000) [rate, unit] = [1000, 'g'];
            const f = v => String(Math.round(v / rate * 1e6) / 1e6);
            const op = { '>=': '≥', '>': '>', '<=': '≤', '<': '<', '~': '~' }[a.ga_op] || '';
            return op + f(n) + (x !== null && x !== n ? '-' + f(x) : '') + unit;
        },
        //  처음엔 모두 초록(맞음) - 검수 끝 목록에서는 저장된 판정
        state(a) { return this.pick[a.ga_id] || (a.ga_checked !== 'N' ? a.ga_checked : 'Y'); },
        pickClass(a) {
            const s = this.state(a);
            return { 'ck-y': s === 'Y', 'ck-x': s === 'X', changed: !!this.pick[a.ga_id] };
        },
        cycle(a) { this.$set(this.pick, a.ga_id, this.state(a) === 'Y' ? 'X' : 'Y'); },
        unfix(a) { this.$delete(this.fix, a.ga_id); },
        //  빠진 값 넣을 칸 하나 더 - 속성은 그 모델에 이미 있는 속성으로 먼저 골라 둠
        addRow(m) {
            const key = m.attrs.length ? m.attrs[0].ga_key : Object.keys(this.attr.defs)[0];
            this.$set(this.adds, m.gm_id, [...(this.adds[m.gm_id] || []), { key, value: '' }]);
        },
        pickAll(g, v) { g.models.forEach(m => m.attrs.forEach(a => this.$set(this.pick, a.ga_id, v))); },
        async attrSave(g) {
            //  화면에 보이는 그대로 저장 (고친 값은 고친 칸에 처음 넣어 준 글자와 다를 때만)
            const items = [];
            g.models.forEach(m => m.attrs.forEach(a => {
                const typed = this.fix[a.ga_id] !== undefined ? this.fix[a.ga_id].trim() : '';
                const value = typed && typed !== this.label(a) ? typed : '';
                const s = value ? 'Y' : this.state(a);
                if (s !== a.ga_checked || value)
                    items.push({ ga_id: a.ga_id, checked: s, value });
            }));
            const adds = [];
            g.models.forEach(m => (this.adds[m.gm_id] || []).forEach(n => {
                if (n.value.trim()) adds.push({ gm_id: m.gm_id, key: n.key, value: n.value.trim() });
            }));
            if (!items.length && !adds.length) return alert('바뀐 것이 없습니다.');
            const res = await ax.post(`/api/admin/site/searchReview/attr/${g.gd_id}`, { items, adds });
            if (this.fail(res)) return;
            const es = { done: '검색 색인 반영', missing: '색인에 없는 상품', failed: '색인 반영 실패 - 밤 작업이 다시 넣음' }[res.data.es];
            this.$bvToast ? this.$bvToast.toast(`${res.data.saved}줄 저장 · ${es}`, { title: `${g.gd_id}번 상품`, variant: res.data.es === 'failed' ? 'warning' : 'success', solid: true })
                          : alert(`${res.data.saved}줄 저장 · ${es}`);
            this.attrFetch(this.attr.page);
        },
    },
    mounted() {
        this.aiFetch(1);
        this.attrFetch(1);
    },
}
</script>

<style scoped>
.review-wrap { padding:24px; max-width:1000px; margin:auto; }
.page-title { font-size: 20px; font-weight: 500; margin-bottom: 16px; }
.tabs { display: flex; gap: 4px; border-bottom: 1px solid #e5e7eb; margin-bottom: 16px; }
.tabs button { background: none; border: none; padding: 10px 16px; font-size: 14px; color: #6b7280; cursor: pointer; border-bottom: 2px solid transparent; }
.tabs button.on { color: #111827; font-weight: 500; border-bottom-color: #1D9E75; }
.tabs small { margin-left: 6px; color: #9ca3af; font-size: 12px; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.hint { font-size: 12px; color: #6b7280; margin-bottom: 12px; }
.empty { padding: 30px; text-align: center; color: #9ca3af; font-size: 13px; }
.search-row { display: flex; gap: 8px; margin-bottom: 14px; }
.search-input { flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none; }
.form-input { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; }
.form-input:focus, .search-input:focus { border-color: #1D9E75; }
.btn { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; white-space: nowrap; }
.btn-primary { background: #1D9E75; color: #fff; }
.review-item { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; }
.row-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap; }
.kw { font-size: 14px; font-weight: 500; margin-right: 6px; color: #111827; }
.btns { display: flex; gap: 4px; flex-wrap: wrap; }
.btn-sm { padding: 4px 10px; font-size: 12px; border-radius: 6px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; }
.btn-sm:hover { background: #f3f4f6; }
.btn-sm.ok { border-color: #1D9E75; color: #0F6E56; }
.btn-sm.ng { border-color: #E24B4A; color: #A32D2D; }
.line { margin-top: 6px; font-size: 13px; }
.label { display: inline-block; min-width: 64px; color: #6b7280; font-size: 12px; }
.muted { color: #6b7280; font-size: 12px; margin-left: 4px; }
.small { font-size: 11px; }
.chip { display: inline-block; padding: 2px 8px; margin: 2px 4px 2px 0; background: #E1F5EE; color: #085041; border-radius: 4px; font-size: 12px; }
.chip.main { background: #1D9E75; color: #fff; }
.chip.gray { background: #f3f4f6; color: #374151; }
.badge { display: inline-block; padding: 1px 6px; margin-right: 4px; border-radius: 4px; font-size: 11px; background: #f3f4f6; color: #374151; }
.st-ok { background: #E1F5EE; color: #085041; }
.st-empty { background: #f3f4f6; color: #6b7280; }
.st-bad { background: #FCEBEB; color: #791F1F; }
.st-wait { background: #FAEEDA; color: #633806; }
.ck-y { background: #EAF3DE !important; color: #27500A !important; }
.ck-x { background: #FCEBEB !important; color: #791F1F !important; text-decoration: line-through; }
.edit-box { margin-top: 10px; padding: 10px; background: #f9fafb; border-radius: 6px; }
.alt-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.alt-row .form-input { width: 280px; }
.good { color: #0F6E56; font-size: 12px; }
.warn { color: #A32D2D; font-size: 12px; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; table-layout: fixed; }
.table td { padding: 8px; border-top: 1px solid #f0f0f0; vertical-align: top; word-break: break-all; }
.spec { color: #374151; font-size: 12px; }
.pick-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 2px; }
.chip.pick { cursor: pointer; background: #f3f4f6; color: #374151; border: 1px solid transparent; }
.chip.pick.changed { border-color: #1D9E75; }
.fix { width: 140px; padding: 3px 8px; font-size: 12px; }
.add-key { padding: 3px 6px; font-size: 12px; }
.link { font-size: 11px; color: #378ADD; cursor: pointer; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 16px; }
.page-btn { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; font-size: 13px; cursor: pointer; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-now { font-size: 13px; color: #6b7280; }
</style>
