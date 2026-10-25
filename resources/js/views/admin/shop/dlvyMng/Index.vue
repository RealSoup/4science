<template>
<div class="p_wrap">
    <h3 class="p_tit">배송 관리</h3>

    <b-container class="frm_sch">
        <sch-date v-model="sch_frm"><b-col slot="prev" class="label top_left">주문일</b-col></sch-date>
        <b-row>
            <b-col class="label">처리상태</b-col>
            <b-col class="type01">
                <b-form-select v-model="sch_frm.od_step">
                    <b-form-select-option value=""></b-form-select-option>
                    <b-form-select-option v-for="(val, key) in steps" :key="key" :value="key">{{ val.name }}</b-form-select-option>
                </b-form-select>
            </b-col>
            <b-col class="label">담당자</b-col>
            <b-col class="type01">
                <b-form-input v-model="mng_name" list="dlvy_mng_list" placeholder="이름 입력/선택" autocomplete="off" @change="setMng" />
                <datalist id="dlvy_mng_list">
                    <option value="담당없음"></option>
                    <option v-for="opt in mng_on" :key="opt.id" :value="opt.name"></option>
                </datalist>
            </b-col>
            <b-col class="label">검색</b-col>
            <b-col class="type04">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-form-select class="custom-select" v-model="sch_frm.mode">
                            <b-form-select-option value="od_id">글번호</b-form-select-option>
                            <b-form-select-option value="gm_name">상품명</b-form-select-option>
                            <b-form-select-option value="od_orderer">주문자명</b-form-select-option>
                            <b-form-select-option value="od_addr1">주소</b-form-select-option>
                        </b-form-select>
                    </b-input-group-prepend>
                    <b-form-input v-model="sch_frm.keyword" :placeholder="sch_frm.mode == 'od_id' ? '글번호 (여러 개는 공백으로 구분)' : '검색어를 입력하세요'" @keyup.enter="routerPush(1)"></b-form-input>
                    <b-input-group-append><b-button @click="routerPush(1)"><b-icon-search /></b-button></b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="label bottom_left">옵션</b-col>
            <b-col class="chk_opt">
                <b-form-checkbox v-model="sch_frm.exclude_done" value="1" unchecked-value="0" inline @change="routerPush(1)">배송완료 제외</b-form-checkbox>
                <b-form-checkbox v-model="sch_frm.no_dlvy" value="1" unchecked-value="0" inline @change="routerPush(1)">배송정보 없는 상품</b-form-checkbox>
            </b-col>
        </b-row>
    </b-container>

    <!-- 송장 묶기 (상단 고정) -->
    <b-container class="box_bar_wrap">
        <div class="box_bar">
            <div><b>송장 {{ boxes.length }}개</b> <small>선택 상품 {{ selCount }}개</small></div>
            <div>
                <b-button size="sm" class="white" @click="clearBoxes" :disabled="!boxes.length">비우기</b-button>
                <b-button size="sm" class="d_blue" @click="exportExcel" :disabled="!boxes.length">엑셀 다운</b-button>
            </div>
        </div>
    </b-container>

    <b-container class="cmain">
        <b-row class="list_top">
            <b-col>Total : <b>{{ list.total }}</b></b-col>
            <b-col class="text-right">
                <b-form-select v-model="sch_frm.list_size" @change="routerPush(1)" size="sm">
                    <b-form-select-option value="20">20개</b-form-select-option>
                    <b-form-select-option value="50">50개</b-form-select-option>
                    <b-form-select-option value="100">100개</b-form-select-option>
                </b-form-select>
            </b-col>
        </b-row>

        <b-row class="head list">
            <b-col>글번호</b-col>
            <b-col>주문번호</b-col>
            <b-col>주문상품</b-col>
            <b-col>받는분</b-col>
            <b-col>처리상태</b-col>
            <b-col>담당자</b-col>
        </b-row>
        <template v-for="od in list.data">
            <b-row class="body list od" :key="`od_${od.od_id}`" :style="{borderLeftColor:color(od.od_id)}" @click="toggle(od.od_id)">
                <b-col>{{ od.od_id }}.</b-col>
                <b-col>{{ od.od_no }}</b-col>
                <b-col class="text-left">
                    <b-icon :icon="opened[od.od_id] ? 'chevron-down' : 'chevron-right'" />
                    {{ od.od_name }}
                    <b-badge v-if="odDone(od)" class="gray">송장완료</b-badge>
                </b-col>
                <b-col>{{ od.od_receiver }}</b-col>
                <b-col><span v-if="steps[od.od_step]" :class="steps[od.od_step].class" class="nametag">{{ steps[od.od_step].name }}</span></b-col>
                <b-col><template v-if="od.od_mng && mng_off[od.od_mng]">{{ mng_off[od.od_mng].name }}</template></b-col>
            </b-row>
            <div v-if="opened[od.od_id]" :key="`items_${od.od_id}`" class="items_wrap">
                <div class="items" :style="{borderLeftColor:color(od.od_id), background:colorBg(od.od_id)}">
                    <div class="items_top">
                        <span class="addr">{{ od.od_receiver }} / {{ od.od_receiver_hp }} / {{ od.od_addr1 }} {{ od.od_addr2 }}</span>
                        <b-button v-if="hasFree(od)" size="sm" class="white" @click="checkAll(od)">미지정 상품 전체 선택</b-button>
                    </div>
                    <b-row v-for="row in brkMap[od.od_id].rows" :key="row.it.odm_id" class="item"
                        :class="{sel:!!sel[row.it.odm_id], none:!sel[row.it.odm_id] && brkMap[od.od_id].lanes && !boxesOf(row.it.odm_id).length}"
                        :style="sel[row.it.odm_id] ? {background:color(od.od_id)} : {}">
                        <b-col class="name text-left">
                            <b>{{ row.it.odm_gd_name }}</b>
                            <span class="sub">{{ row.it.odm_gm_name }} / {{ row.it.odm_gm_code }} / {{ row.it.odm_gm_catno }}</span>
                            <b-badge v-if="row.it.odpa_pa_id" class="orange">업체직배송</b-badge>
                        </b-col>
                        <b-col class="ea">수량 <b>{{ row.it.odm_ea }}</b>개</b-col>
                        <b-col class="chk">
                            <b-form-checkbox :checked="!!sel[row.it.odm_id]" @change="checkItem(od, row.it, $event)" />
                        </b-col>
                        <b-col class="quick">
                            <b-button v-if="!boxesOf(row.it.odm_id).length" size="sm" class="btn_one" @click="makeOne(od, row.it)">송장</b-button>
                            <template v-if="last_sel == row.it.odm_id">
                                <b-button size="sm" class="btn_multi" @click="makeBox">상품들 송장<template v-if="selCount > 1"> ({{ selCount }})</template></b-button>
                                <b-form-select v-if="boxes.length" v-model="quick_box" size="sm" @change="quickAdd">
                                    <b-form-select-option value="">송장에 추가</b-form-select-option>
                                    <b-form-select-option v-for="(b, i) in boxes" :key="b.no" :value="i">송장{{ b.no }}</b-form-select-option>
                                </b-form-select>
                            </template>
                        </b-col>
                        <b-col class="text-left">
                            <b-badge v-for="b in boxesOf(row.it.odm_id)" :key="`b${b.no}`" class="box_badge" :style="{background:boxColor(b.no)}">송장{{ b.no }}<template v-if="b.mixed"> +타주문</template></b-badge>
                            <span v-for="d in row.it.dlvy" :key="d.oddi_id" class="dlvy">{{ d.oddi_dlvy_com }} {{ d.oddi_dlvy_num }}</span>
                        </b-col>
                        <div class="brk_col">
                            <span v-for="(c, ci) in row.cells" :key="ci" class="lane" :class="c ? c.pos : ''" :style="c ? {color:boxColor(c.no)} : {}"
                                :title="c ? `송장${c.no}${c.mixed ? ' (다른 주문 포함)' : ''}` : ''">
                                <small v-if="c && (c.pos == 'top' || c.pos == 'one')" class="no">{{ c.no }}<template v-if="c.mixed">+</template></small>
                            </span>
                        </div>
                    </b-row>
                </div>
            </div>
        </template>

        <pagination :data="list" @pagination-change-page="routerPush" :limit="5" :showDisabled="true" align="center" class="mt-4">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
            <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>

    <!-- 송장 목록 -->
    <b-container class="box_wrap">
        <b-row class="list_top">
            <b-col><b>송장 목록</b> <small>송장 1개 = 엑셀 1행, 박스 수 = F열 수량</small></b-col>
        </b-row>
        <div v-for="(b, i) in boxes" :key="b.no" class="box" :style="{borderLeftColor:boxColor(b.no)}">
            <div class="box_head">
                <span v-for="od_id in boxOdIds(b)" :key="od_id" class="dot" :style="{background:color(od_id)}"></span>
                <b :style="{color:boxColor(b.no)}">송장{{ b.no }}</b>
                <span class="cnt">박스 <b-form-spinbutton v-model="b.cnt" min="1" max="99" size="sm" inline /></span>
                <span class="receiver">{{ b.items[0].receiver }} / {{ b.items[0].addr }}</span>
                <b-badge v-if="boxWarn(b)" class="orange">받는분/주소가 다른 주문 포함 (첫 주문 기준으로 출력)</b-badge>
                <b-button size="sm" variant="danger" class="float-right" @click="boxes.splice(i, 1)">송장 삭제</b-button>
            </div>
            <div v-for="(it, ii) in b.items" :key="it.odm_id" class="box_item">
                <span class="dot" :style="{background:color(it.od_id)}"></span>
                {{ it.od_id }}. {{ it.name }} <small>(수량 {{ it.ea }}개)</small>
                <b-link class="item_del" @click="removeItem(i, ii)"><b-icon-x /></b-link>
            </div>
        </div>
    </b-container>

    <!-- 한진 회신 엑셀 등록 -->
    <b-container class="upload_wrap">
        <b-row class="list_top">
            <b-col><b>한진 회신 엑셀 등록</b> <small>운송장번호, 메모2 열을 읽어 상품별 송장을 등록합니다.</small></b-col>
        </b-row>
        <b-row>
            <b-col><b-form-file v-model="upload_file" accept=".xlsx,.xls" placeholder="한진 회신 엑셀 선택" @input="preview = null" /></b-col>
            <b-col class="text-right" cols="3">
                <b-button class="teal" @click="previewUpload" :disabled="!upload_file">미리보기</b-button>
                <b-button class="d_blue" @click="storeUpload" :disabled="!preview || !preview.cnt.new">등록 ({{ preview ? preview.cnt.new : 0 }})</b-button>
            </b-col>
        </b-row>
        <template v-if="preview">
            <p class="mt-3">
                <b-badge class="mint">등록 예정 {{ preview.cnt.new }}</b-badge>
                <b-badge class="gray">건너뜀 {{ preview.cnt.dup }}</b-badge>
                <b-badge class="red">오류 {{ preview.cnt.error }}</b-badge>
            </p>
            <b-row class="head list">
                <b-col>행</b-col>
                <b-col>운송장번호</b-col>
                <b-col>받는분</b-col>
                <b-col>메모2</b-col>
                <b-col>상품</b-col>
            </b-row>
            <b-row v-for="r in preview.rows" :key="r.line" class="body list">
                <b-col>{{ r.line }}</b-col>
                <b-col>{{ r.dlvy_num }}</b-col>
                <b-col>{{ r.name }}</b-col>
                <b-col class="text-left">{{ r.memo }}</b-col>
                <b-col class="text-left">
                    <div v-for="(it, k) in r.items" :key="k" :class="`st_${it.status}`">
                        {{ it.od_id }}[{{ it.odm_id }}] {{ it.name }}
                        <small v-if="it.msg">- {{ it.msg }}</small>
                    </div>
                </b-col>
            </b-row>
        </template>
    </b-container>
</div>
</template>

<script>
import ax from '@/api/http';

const PALETTE = ['#E8590C', '#1C7ED6', '#2F9E44', '#AE3EC9', '#F08C00', '#0C8599', '#C2255C', '#5C940D', '#3B5BDB', '#862E9C'];
const BOX_PALETTE = ['#E03131', '#1971C2', '#2B8A3E', '#F08C00', '#7048E8', '#0CA678', '#D6336C', '#495057'];

export default {
    components: {
        'sch-date': () => import('@/views/_common/SchDate.vue'),
    },
    data() {
        return {
            list: {},
            steps: {},
            mng_on: [],
            mng_off: {},
            mng_name: '',
            sch_frm: {
                startDate: '',
                endDate: '',
                od_step: '',
                od_mng: '',
                mode: 'od_id',
                keyword: '',
                exclude_done: '1',
                no_dlvy: '1',
                page: 1,
                list_size: 20,
            },
            opened: {},
            sel: {},        //  odm_id => { od, it }
            boxes: [],      //  송장 [{ no, cnt(박스 수), items:[{ od_id, odm_id, name, ea, receiver, addr }] }]
            box_seq: 0,
            quick_box: '',
            last_sel: null,  //  마지막에 체크한 상품 (바로가기 버튼 표시 위치)
            upload_file: null,
            preview: null,
        }
    },
    computed: {
        //  od_id => { lanes, rows:[{ it, cells:[레인별 괄호 조각] }] }
        //  같은 송장 상품은 주문 안에서 붙여 정렬, 송장마다 오른쪽 괄호 레인 배정
        brkMap() {
            let rst = {};
            (this.list.data || []).forEach(od => {
                const has = (b, odm_id) => b.items.some(x => x.odm_id == odm_id);
                const bx = this.boxes.filter(b => b.items.some(x => x.od_id == od.od_id));
                const rows = od.items.map((it, i) => {
                    const k = bx.findIndex(b => has(b, it.odm_id));
                    return { it, i, k: k < 0 ? Infinity : k };
                }).sort((a, b) => a.k - b.k || a.i - b.i);

                let lanes = [];     //  레인별 마지막 행
                const spans = bx.map(b => {
                    const idx = rows.map((r, ri) => has(b, r.it.odm_id) ? ri : -1).filter(v => v >= 0);
                    const sp = { no: b.no, s: idx[0], e: idx[idx.length - 1], idx, mixed: b.items.some(x => x.od_id != od.od_id) };
                    let l = lanes.findIndex(end => end < sp.s);
                    if (l < 0) { l = lanes.length; lanes.push(-1); }
                    lanes[l] = sp.e;
                    sp.lane = l;
                    return sp;
                });

                rst[od.od_id] = {
                    lanes: lanes.length,
                    rows: rows.map((r, ri) => {
                        let cells = Array(lanes.length).fill(null);
                        spans.forEach(sp => {
                            if (ri < sp.s || ri > sp.e) return;
                            const pos = sp.s == sp.e ? 'one' : ri == sp.s ? 'top' : ri == sp.e ? 'bot' : sp.idx.includes(ri) ? 'mid' : 'pass';
                            cells[sp.lane] = { pos, no: sp.no, mixed: sp.mixed };
                        });
                        return { it: r.it, cells };
                    }),
                };
            });
            return rst;
        },
        selCount() { return Object.keys(this.sel).length; },
    },
    methods: {
        async index() {
            try {
                if (this.sch_frm.startDate && this.sch_frm.endDate && this.sch_frm.startDate > this.sch_frm.endDate) {
                    Notify.modal('주문 시작일이 종료일보다 높을 수는 없습니다.', 'warning');
                    return false;
                }
                const res = await ax.get(`/api/admin/shop/dlvy_mng`, { params: this.sch_frm });
                if (res && res.status === 200) {
                    this.list = res.data.list;
                    this.steps = res.data.steps;
                    this.mng_on = res.data.mng_on || [];
                    this.mng_off = res.data.mng_off || {};
                    this.mng_name = this.sch_frm.od_mng == 'no' ? '담당없음' : (this.mng_off[this.sch_frm.od_mng] ? this.mng_off[this.sch_frm.od_mng].name : '');
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        routerPush(p) {
            this.sch_frm.page = p;
            this.$router.push({ name: 'adm_dlvy_mng', query: this.sch_frm }).catch(() => {});
        },
        setMng() {
            if (isEmpty(this.mng_name))         this.sch_frm.od_mng = '';
            else if (this.mng_name == '담당없음') this.sch_frm.od_mng = 'no';
            else {
                const m = this.mng_on.find(o => o.name == this.mng_name);
                if (!m) { Notify.toast('warning', '담당자를 목록에서 선택하세요.'); return; }
                this.sch_frm.od_mng = m.id;
            }
            this.routerPush(1);
        },

        color(od_id) { return PALETTE[od_id % PALETTE.length]; },
        colorBg(od_id) { return PALETTE[od_id % PALETTE.length] + '14'; },
        toggle(od_id) { this.$set(this.opened, od_id, !this.opened[od_id]); },
        boxColor(no) { return BOX_PALETTE[(no - 1) % BOX_PALETTE.length]; },
        odDone(od) { return od.items.length && od.items.every(it => it.dlvy.length); },
        boxesOf(odm_id) {
            return this.boxes.filter(b => b.items.some(it => it.odm_id == odm_id))
                .map(b => ({ no: b.no, mixed: new Set(b.items.map(it => it.od_id)).size > 1 }));
        },

        checkItem(od, it, checked) {
            if (checked) {
                this.$set(this.sel, it.odm_id, { od, it });
                this.last_sel = it.odm_id;
            } else {
                this.$delete(this.sel, it.odm_id);
                if (this.last_sel == it.odm_id) this.last_sel = Object.keys(this.sel).pop() || null;
            }
        },
        clearSel() {
            this.sel = {};
            this.last_sel = null;
        },
        //  송장에도 없고 선택도 안 된 상품이 있는지
        hasFree(od) { return od.items.some(it => !this.sel[it.odm_id] && !this.boxesOf(it.odm_id).length); },
        //  아직 어느 송장에도 없는 상품만 선택
        checkAll(od) {
            od.items.forEach(it => { if (!this.boxesOf(it.odm_id).length && !this.sel[it.odm_id]) this.checkItem(od, it, true); });
        },
        boxItem(od, it) {
            return {
                od_id: od.od_id,
                odm_id: it.odm_id,
                name: it.odm_gd_name,
                ea: it.odm_ea,
                receiver: od.od_receiver,
                addr: `${od.od_addr1} ${od.od_addr2 || ''}`.trim(),
            };
        },
        //  상품 1개 -> 바로 송장 1개 (송장 없는 상품에만 버튼 표시)
        makeOne(od, it) {
            this.boxes.push({ no: ++this.box_seq, cnt: 1, items: [this.boxItem(od, it)] });
            if (this.sel[it.odm_id]) this.checkItem(od, it, false);
        },
        //  선택 상품 -> 송장 아이템. 수량 1개 상품이 이미 다른 송장에 있으면 한 번 확인
        async takeSel(box) {
            let items = Object.values(this.sel).map(s => this.boxItem(s.od, s.it));
            if (box) items = items.filter(it => !box.items.some(x => x.odm_id == it.odm_id));
            if (!items.length) {
                Notify.toast('warning', '선택 상품이 이미 해당 송장에 있습니다.');
                return null;
            }
            const one = items.filter(it => it.ea <= 1 && this.boxesOf(it.odm_id).length);
            if (one.length && !await Notify.confirm(`${one.map(it => it.name).join(', ')} : 1개 상품인데 송장을 추가`))
                return null;
            return items;
        },
        async makeBox() {
            const items = await this.takeSel();
            if (!items) return;
            this.boxes.push({ no: ++this.box_seq, cnt: 1, items });
            this.clearSel();
        },
        async addToBox(bi) {
            const box = this.boxes[bi];
            if (!box) return;
            const items = await this.takeSel(box);
            if (!items) return;
            box.items.push(...items);
            this.clearSel();
        },
        //  상품 옆 송장 선택 -> 바로 추가
        async quickAdd(bi) {
            this.quick_box = '';
            if (bi !== '') await this.addToBox(bi);
        },
        removeItem(bi, ii) {
            this.boxes[bi].items.splice(ii, 1);
            if (!this.boxes[bi].items.length) this.boxes.splice(bi, 1);
        },
        async clearBoxes() {
            if (await Notify.confirm('송장을 모두 비우기'))
                this.boxes = [];
        },
        boxOdIds(b) { return [...new Set(b.items.map(it => it.od_id))]; },
        boxWarn(b) { return new Set(b.items.map(it => `${it.receiver}|${it.addr}`)).size > 1; },

        async exportExcel() {
            if (this.boxes.some(b => !(parseInt(b.cnt) > 0))) {
                Notify.toast('warning', '송장 박스 수를 확인하세요.');
                return;
            }
            try {
                const params = { boxes: this.boxes.map(b => ({ cnt: parseInt(b.cnt), items: b.items.map(it => ({ odm_id: it.odm_id })) })) };
                const res = await ax.post(`/api/admin/shop/dlvy_mng/export`, params, { responseType: 'blob' });
                if (!res || res.status !== 200) return;
                const d = new Date();
                const ymd = d.format('yyyyMMdd') + '_' + [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => String(v).padStart(2, '0')).join('');
                const fileUrl = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileUrl;
                fileLink.setAttribute('download', `한진_${ymd}.xlsx`);
                document.body.appendChild(fileLink);
                fileLink.click();
                document.body.removeChild(fileLink);
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', '엑셀 다운로드 실패');
            }
        },

        async previewUpload() {
            try {
                const frm = new FormData();
                frm.append('file', this.upload_file);
                const res = await ax.post(`/api/admin/shop/dlvy_mng/preview`, frm);
                if (res && res.status === 200) this.preview = res.data;
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
        async storeUpload() {
            if (!await Notify.confirm(`송장 ${this.preview.cnt.new}건을 등록`)) return;
            try {
                const frm = new FormData();
                frm.append('file', this.upload_file);
                const res = await ax.post(`/api/admin/shop/dlvy_mng/store`, frm);
                if (res && res.status === 200) {
                    const c = res.data.cnt;
                    Notify.modal(`등록 ${c.insert + c.update}건 (빈 배송정보 채움 ${c.update}, 추가 ${c.insert}) / 건너뜀 ${c.skip} / 오류 ${c.error}`, 'success', '완료');
                    this.preview = null;
                    this.upload_file = null;
                    this.index();
                }
            } catch (e) {
                Notify.consolePrint(e);
                Notify.toast('warning', e.response.data.message);
            }
        },
    },
    mounted() {
        this.sch_frm = Object.assign({}, this.sch_frm, this.$route.query);
        this.index();
    },
    beforeRouteUpdate(to, from, next) {
        this.sch_frm = Object.assign({}, this.sch_frm, to.query);
        this.index();
        next();
    },
}
</script>

<style lang="css" scoped>
.cmain, .box_wrap, .upload_wrap { margin-bottom:2rem; }
.box_bar_wrap { position:sticky; top:0; z-index:1020; margin-bottom:1rem; padding:0; }
.box_bar { display:flex; justify-content:space-between; align-items:center; padding:.5rem 1rem; background:#FFF; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,.15); }
.list_top select { display:inline-block; max-width:7rem; }
.frm_sch .chk_opt { display:flex; align-items:center; }

.row .col { font-weight:600; }
.cmain .list .col:nth-child(1) { flex:0 0 8%; max-width:8%; }
.cmain .list .col:nth-child(2) { flex:0 0 12%; max-width:12%; }
.cmain .list .col:nth-child(4) { flex:0 0 12%; max-width:12%; }
.cmain .list .col:nth-child(5) { flex:0 0 10%; max-width:10%; }
.cmain .list .col:nth-child(6) { flex:0 0 10%; max-width:10%; }
.body.od { cursor:pointer; border-left:6px solid transparent; }
.body.od:hover { background:#B2E0FA; }

.cmain .list .col { text-align:left; }
/* 펼침 영역: 전체 폭 틀로 감싸 목록 테두리선 유지, 상품은 35% 들여쓰기 */
.items_wrap { padding-left:35%; border:1px solid #CCCCCC; border-top:0; }
.items { border-left:6px solid transparent; padding:.5rem 1rem; }
.items .items_top { display:flex; justify-content:space-between; align-items:center; margin-bottom:.3rem; }
.items .items_top .addr { font-size:.85rem; color:#555; }
.items .item { align-items:center; padding:.3rem 0; border-top:1px dashed #DDDDDD; }
.items .item .col { font-weight:400; }
.items .item { transition:background .1s; }
.items .item.sel { color:#FFF; }
.items .item.sel .sub { color:rgba(255,255,255,.85); }
.items .item.sel .box_badge { border:1px solid #FFF; }
.items .item .chk { flex:0 0 4%; max-width:4%; display:flex; justify-content:center; }
.items .item .chk .custom-checkbox { transform:scale(2); padding-left:1.5rem; margin-left:-.5rem; }  /* 체크박스 2배 */
.items .item .name { flex:0 0 38%; max-width:38%; }  /* 고정 폭: 버튼이 생겨도 수량/체크박스 위치 유지 */
.items .item .ea { flex:0 0 10%; max-width:10%; }
.items .item .quick { flex:0 0 auto; width:auto; max-width:none; display:flex; gap:4px; }
.items .item .quick select { width:7.5rem; }
.items .item .quick .btn_one { background:#FFF; color:#1971C2; border:1px solid #1971C2; font-weight:700; }
.items .item .quick .btn_one:hover { background:#1971C2; color:#FFF; }
.items .item .quick .btn_multi { background:#FAB005; color:#212529; border:1px solid #F08C00; font-weight:700; }
.items .item .quick .btn_multi:hover { background:#F08C00; color:#FFF; }
.items .item .sub { display:block; font-size:.8rem; color:#777; }
.items .item.none { background:#FFF3BF; }
.items .box_badge { color:#FFF; margin-right:3px; }
.items .dlvy { display:inline-block; font-size:.8rem; background:#E9ECEF; border-radius:3px; padding:0 5px; margin-right:3px; }

.box { border:1px solid #CCCCCC; border-left:6px solid transparent; border-radius:4px; padding:.5rem; margin-bottom:.5rem; }
.box .box_head { border-bottom:1px solid #EEEEEE; padding-bottom:.3rem; margin-bottom:.3rem; }
.box .box_head .receiver { font-size:.85rem; color:#555; margin:0 .5rem; }
.box .box_item { padding:.15rem 0; }
.box .box_head .cnt { margin-left:.5rem; }
.box .box_head .cnt .b-form-spinbutton { width:6.5rem; vertical-align:middle; }
.box .box_item .item_del { color:#E03131; font-size:1.2rem; vertical-align:middle; }
.box .box_item .item_del:hover { color:#C92A2A; }
.dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:3px; }

/* 송장 묶음 괄호: 레인 1개 = 송장 1개 */
.items .item .brk_col { display:flex; align-self:stretch; margin:-.3rem 0; padding-right:.5rem; }
.items .item .brk_col .lane { position:relative; width:18px; }
.items .item .brk_col .lane::before { content:''; position:absolute; left:0; right:6px; border:0 solid currentColor; }
.items .item .brk_col .lane.top::before { top:50%; bottom:0; border-top-width:3px; border-right-width:3px; }
.items .item .brk_col .lane.mid::before { top:0; bottom:0; border-right-width:3px; }
.items .item .brk_col .lane.mid::after { content:''; position:absolute; left:0; right:6px; top:50%; border-top:3px solid currentColor; }
.items .item .brk_col .lane.pass::before { top:0; bottom:0; border-right-width:3px; border-right-style:dotted; }
.items .item .brk_col .lane.bot::before { top:0; bottom:50%; border-bottom-width:3px; border-right-width:3px; }
.items .item .brk_col .lane.one::before { top:25%; bottom:25%; border-width:3px 3px 3px 0; }
.items .item .brk_col .lane .no { position:absolute; left:0; bottom:calc(50% + 4px); font-size:10px; font-weight:700; line-height:1; }
.items .item .brk_col .lane.one .no { bottom:calc(75% + 2px); }

.upload_wrap .st_new { color:#2F9E44; }
.upload_wrap .st_dup { color:#868E96; }
.upload_wrap .st_error { color:#E03131; }
.upload_wrap .list .col:nth-child(1) { flex:0 0 5%; max-width:5%; }
.upload_wrap .list .col:nth-child(2) { flex:0 0 13%; max-width:13%; }
.upload_wrap .list .col:nth-child(3) { flex:0 0 12%; max-width:12%; }
.upload_wrap .list .col:nth-child(4) { flex:0 0 25%; max-width:25%; }
</style>
