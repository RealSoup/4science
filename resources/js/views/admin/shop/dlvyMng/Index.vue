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
                    <b-form-input v-model="sch_frm.keyword" placeholder="검색어를 입력하세요" @keyup.enter="routerPush(1)"></b-form-input>
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
            <div v-if="opened[od.od_id]" :key="`items_${od.od_id}`" class="items" :style="{borderLeftColor:color(od.od_id), background:colorBg(od.od_id)}">
                <div class="items_top">
                    <span class="addr">{{ od.od_receiver }} / {{ od.od_receiver_hp }} / {{ od.od_addr1 }} {{ od.od_addr2 }}</span>
                    <b-button size="sm" class="white" @click="checkAll(od)">남은 상품 전체 선택</b-button>
                </div>
                <b-row v-for="it in od.items" :key="it.odm_id" class="item"
                    :class="{sel:!!sel[it.odm_id], warn:!sel[it.odm_id] && assigned[it.odm_id] && remain(it) > 0, full:remain(it) <= 0}"
                    :style="sel[it.odm_id] ? {background:color(od.od_id)} : {}">
                    <b-col class="text-left">
                        <b>{{ it.odm_gd_name }}</b>
                        <span class="sub">{{ it.odm_gm_name }} / {{ it.odm_gm_code }} / {{ it.odm_gm_catno }}</span>
                        <b-badge v-if="it.odpa_pa_id" class="orange">업체직배송</b-badge>
                    </b-col>
                    <b-col class="ea">주문 {{ it.odm_ea }} / 남음 <b>{{ remain(it) }}</b></b-col>
                    <b-col class="chk">
                        <b-form-checkbox :checked="!!sel[it.odm_id]" :disabled="remain(it) <= 0" @change="checkItem(od, it, $event)" />
                    </b-col>
                    <b-col class="ea_input">
                        <template v-if="sel[it.odm_id]">
                            <b-form-input v-for="(c, ci) in sel[it.odm_id].chunks" :key="ci" v-model.number="sel[it.odm_id].chunks[ci]"
                                type="number" min="1" size="sm" class="chunk" :class="{next:ci == 0}" :title="ci == 0 ? '다음 박스에 들어갈 수량' : `분할 ${ci + 1}`"
                                @blur="splitChunk(it, ci)" @keyup.enter="$event.target.blur()" />
                        </template>
                    </b-col>
                    <b-col class="text-left">
                        <b-badge v-for="(b, bi) in boxesOf(it.odm_id)" :key="`b${bi}`" class="box_badge" :style="{background:color(od.od_id)}">박스{{ b.no }}:{{ b.ea }}</b-badge>
                        <span v-for="d in it.dlvy" :key="d.oddi_id" class="dlvy">{{ d.oddi_dlvy_com }} {{ d.oddi_dlvy_num }}</span>
                    </b-col>
                </b-row>
            </div>
        </template>

        <pagination :data="list" @pagination-change-page="routerPush" :limit="5" :showDisabled="true" align="center" class="mt-4">
            <span slot="prev-nav"><b-icon-chevron-left /></span>
            <span slot="next-nav"><b-icon-chevron-right /></span>
        </pagination>
    </b-container>

    <!-- 박스 묶기 -->
    <b-container class="box_wrap">
        <div class="box_bar">
            <div><b>박스 {{ boxes.length }}개</b> <small>선택 상품 {{ selCount }}개</small></div>
            <div>
                <b-button size="sm" class="mint" @click="makeBox" :disabled="!selCount">선택 상품 → 송장추가</b-button>
                <b-input-group size="sm" class="add_box">
                    <b-form-select v-model="target_box" size="sm">
                        <b-form-select-option value="">박스 선택</b-form-select-option>
                        <b-form-select-option v-for="(b, i) in boxes" :key="b.no" :value="i">박스{{ b.no }}</b-form-select-option>
                    </b-form-select>
                    <b-input-group-append><b-button size="sm" class="teal" @click="addToBox" :disabled="!selCount || target_box === ''">에 추가</b-button></b-input-group-append>
                </b-input-group>
                <b-button size="sm" class="white" @click="clearBoxes" :disabled="!boxes.length">비우기</b-button>
                <b-button size="sm" class="d_blue" @click="exportExcel" :disabled="!boxes.length">한진 엑셀 다운로드</b-button>
            </div>
        </div>
        <b-row class="list_top">
            <b-col><b>박스 목록</b></b-col>
        </b-row>
        <div v-for="(b, i) in boxes" :key="b.no" class="box">
            <div class="box_head">
                <span v-for="od_id in boxOdIds(b)" :key="od_id" class="dot" :style="{background:color(od_id)}"></span>
                <b>박스{{ b.no }}</b> 수량 {{ boxEa(b) }}
                <span class="receiver">{{ b.items[0].receiver }} / {{ b.items[0].addr }}</span>
                <b-badge v-if="boxWarn(b)" class="orange">받는분/주소가 다른 주문 포함 (첫 주문 기준으로 출력)</b-badge>
                <b-button size="sm" variant="danger" class="float-right" @click="boxes.splice(i, 1)">박스 삭제</b-button>
            </div>
            <div v-for="(it, ii) in b.items" :key="`${it.odm_id}_${ii}`" class="box_item">
                <span class="dot" :style="{background:color(it.od_id)}"></span>
                {{ it.od_id }}. {{ it.name }}
                <b-form-input v-model.number="it.ea" type="number" min="1" size="sm" class="d-inline-block ea" />
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
            sel: {},        //  odm_id => { od, it, ea }
            boxes: [],      //  [{ no, items:[{ od_id, odm_id, name, ea, receiver, addr }] }]
            box_seq: 0,
            target_box: '',
            upload_file: null,
            preview: null,
        }
    },
    computed: {
        //  odm_id => 박스에 담긴 수량 합
        assigned() {
            let rst = {};
            this.boxes.forEach(b => b.items.forEach(it => { rst[it.odm_id] = (rst[it.odm_id] || 0) + (parseInt(it.ea) || 0); }));
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
        remain(it) { return it.odm_ea - (this.assigned[it.odm_id] || 0); },
        odDone(od) { return od.items.length && od.items.every(it => it.dlvy.length); },
        boxesOf(odm_id) {
            let rst = [];
            this.boxes.forEach(b => b.items.forEach(it => { if (it.odm_id == odm_id) rst.push({ no: b.no, ea: it.ea }); }));
            return rst;
        },

        checkItem(od, it, checked) {
            if (checked) this.$set(this.sel, it.odm_id, { od, it, chunks: [this.remain(it)] });
            else this.$delete(this.sel, it.odm_id);
        },
        checkAll(od) {
            od.items.forEach(it => { if (this.remain(it) > 0 && !this.sel[it.odm_id]) this.checkItem(od, it, true); });
        },
        //  수량 입력 후 포커스가 빠지면 남은 수량으로 오른쪽에 분할 칸 생성 (분할 합 = 남은 수량)
        splitChunk(it, ci) {
            const s = this.sel[it.odm_id];
            if (!s) return;
            const total = this.remain(it);
            let chunks = s.chunks.slice(0, ci + 1).map(v => parseInt(v) || 0);
            const before = chunks.slice(0, ci).reduce((acc, v) => acc + v, 0);
            chunks[ci] = Math.min(Math.max(chunks[ci], 1), total - before);
            const rest = total - before - chunks[ci];
            if (rest > 0) chunks.push(rest);
            s.chunks = chunks;
        },
        //  선택 상품의 첫 번째 분할 수량을 박스 아이템으로 변환 (수량 검사)
        takeSel() {
            let items = [];
            for (const odm_id in this.sel) {
                const s = this.sel[odm_id];
                const ea = parseInt(s.chunks[0]);
                if (!(ea > 0) || ea > this.remain(s.it)) {
                    Notify.toast('warning', `${s.it.odm_gd_name}: 수량은 1 ~ ${this.remain(s.it)} 사이로 입력하세요.`);
                    return null;
                }
                items.push({
                    od_id: s.od.od_id,
                    odm_id: s.it.odm_id,
                    name: s.it.odm_gd_name,
                    ea,
                    receiver: s.od.od_receiver,
                    addr: `${s.od.od_addr1} ${s.od.od_addr2 || ''}`.trim(),
                });
            }
            return items;
        },
        //  박스에 넣은 첫 분할을 빼고, 남은 분할이 있으면 선택 유지 (다음 박스에 이어서 담기)
        consumeSel() {
            for (const odm_id in this.sel) {
                const s = this.sel[odm_id];
                if (s.chunks.length > 1) s.chunks = s.chunks.slice(1);
                else this.$delete(this.sel, odm_id);
            }
        },
        makeBox() {
            const items = this.takeSel();
            if (!items) return;
            this.boxes.push({ no: ++this.box_seq, items });
            this.consumeSel();
        },
        addToBox() {
            const items = this.takeSel();
            if (!items) return;
            this.boxes[this.target_box].items.push(...items);
            this.consumeSel();
        },
        removeItem(bi, ii) {
            this.boxes[bi].items.splice(ii, 1);
            if (!this.boxes[bi].items.length) this.boxes.splice(bi, 1);
        },
        async clearBoxes() {
            if (await Notify.confirm('박스를 모두 비우기'))
                this.boxes = [];
        },
        boxEa(b) { return b.items.reduce((acc, it) => acc + (parseInt(it.ea) || 0), 0); },
        boxOdIds(b) { return [...new Set(b.items.map(it => it.od_id))]; },
        boxWarn(b) { return new Set(b.items.map(it => `${it.receiver}|${it.addr}`)).size > 1; },

        async exportExcel() {
            if (this.boxes.some(b => b.items.some(it => !(parseInt(it.ea) > 0)))) {
                Notify.toast('warning', '박스 상품 수량을 확인하세요.');
                return;
            }
            try {
                const params = { boxes: this.boxes.map(b => ({ items: b.items.map(it => ({ odm_id: it.odm_id, ea: parseInt(it.ea) })) })) };
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
.p_wrap { padding-bottom:4rem; }
.cmain, .box_wrap, .upload_wrap { margin-bottom:2rem; }
.box_bar { position:fixed; left:170px; right:0; bottom:0; z-index:1020; display:flex; justify-content:space-between; align-items:center; padding:.5rem 1.5rem; background:#FFF; box-shadow:0 -2px 8px rgba(0,0,0,.15); }
@media (max-width: 991px) { .box_bar { left:0; } }
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
.items { border-left:6px solid transparent; padding:.5rem 1rem; border-bottom:1px solid #CCCCCC; margin-left:35%; }
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
.items .item .ea { flex:0 0 13%; max-width:13%; }
.items .item .ea_input { flex:0 0 26%; max-width:26%; display:flex; flex-wrap:wrap; gap:4px; }
.items .item .ea_input .chunk { width:4.5rem; flex:0 0 4.5rem; }
.items .item .ea_input .chunk.next { border:2px solid #1C7ED6; font-weight:700; }
.items .item .sub { display:block; font-size:.8rem; color:#777; }
.items .item.warn { background:#FFF3BF; }
.items .item.full { opacity:.55; }
.items .box_badge { color:#FFF; margin-right:3px; }
.items .dlvy { display:inline-block; font-size:.8rem; background:#E9ECEF; border-radius:3px; padding:0 5px; margin-right:3px; }

.box_bar .add_box { display:inline-flex; width:auto; vertical-align:middle; }
.box_bar .add_box select { max-width:7rem; }
.box { border:1px solid #CCCCCC; border-radius:4px; padding:.5rem; margin-bottom:.5rem; }
.box .box_head { border-bottom:1px solid #EEEEEE; padding-bottom:.3rem; margin-bottom:.3rem; }
.box .box_head .receiver { font-size:.85rem; color:#555; margin:0 .5rem; }
.box .box_item { padding:.15rem 0; }
.box .box_item .ea { width:5rem; margin:0 .3rem; }
.box .box_item .item_del { color:#E03131; font-size:1.2rem; vertical-align:middle; }
.box .box_item .item_del:hover { color:#C92A2A; }
.dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:3px; }

.upload_wrap .st_new { color:#2F9E44; }
.upload_wrap .st_dup { color:#868E96; }
.upload_wrap .st_error { color:#E03131; }
.upload_wrap .list .col:nth-child(1) { flex:0 0 5%; max-width:5%; }
.upload_wrap .list .col:nth-child(2) { flex:0 0 13%; max-width:13%; }
.upload_wrap .list .col:nth-child(3) { flex:0 0 12%; max-width:12%; }
.upload_wrap .list .col:nth-child(4) { flex:0 0 25%; max-width:25%; }
</style>
