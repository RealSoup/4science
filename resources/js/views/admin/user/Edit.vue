<template>
    <div class="p_wrap">
        <h3>회원 정보 수정</h3>
        <b-card no-body class="act_ctrl">
            <b-container>
                <b-row>
                    <b-col>
                        <div class="type_icon"><b-icon-tags-fill />{{ frm.id }}</div>
                        <div class="type_icon"><b-icon-calendar2-date-fill />{{ frm.created_at | formatDate }}</div>
                    </b-col>
                    <b-col class="text-right">
                        <b-button-group size="sm">
                            <b-button variant="light" :to="{name: 'adm_user'}"><b-icon-list-ol />목록</b-button>
                            <b-button variant="primary" @click="update"><b-icon-pencil-square />수정 완료</b-button>
                            <b-button variant="info" @click="isModalViewed = !isModalViewed">마일리지</b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="adform">
            <b-container>
                <b-row><b-col class="tit">회원정보</b-col></b-row>
                <b-row>
                    <b-col class="label">회원 유형</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.group" id="group">
                            <b-form-select-option v-for="(v, i) in frm.option.group" :value="i" :key="i">{{v}}</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">회원등급</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.level" id="level">
                            <b-form-select-option value="0"></b-form-select-option>
                            <b-form-select-option v-for="(grade, k) in frm.option.grade" :key="k" :value="k">{{grade}}</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">담당자</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.mng" id="mng">
                            <b-form-select-option value="0"></b-form-select-option>
                            <b-form-select-option v-for="(v, k) in frm.mng_list" :key="k" :value="v.id">{{v.name}}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="label">이름</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.name" /></b-col>

                    <b-col class="label">이메일</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.email" /></b-col>
                    <b-col class="checkbox01">
                        <b-form-checkbox v-model="frm.receive_mail" id="receive_mail" value="Y" unchecked-value="N" size="lg">
                            수신
                            <b v-if="frm.receive_mail=='Y'">동의</b>
                            <b v-else>안함</b>
                        </b-form-checkbox>
                    </b-col>

                    <b-col class="label">휴대폰</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.hp" /></b-col>
                    <b-col class="checkbox01">
                        <b-form-checkbox v-model="frm.receive_sms" id="receive_sms" value="Y" unchecked-value="N" size="lg">
                            수신
                            <b v-if="frm.receive_sms=='Y'">동의</b>
                            <b v-else>안함</b>
                        </b-form-checkbox>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="label">생년월일</b-col>
                    <b-col class="type02">
                        <b-input-group size="sm">
                            <b-form-input v-model="frm.birth" id="birth" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker v-model="frm.birth" size="sm" button-only right></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col class="label">일반전화</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.tel" /></b-col>
                    <b-col class="label">팩스</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.fax" /></b-col>
                </b-row>

                <b-row><b-col><hr /></b-col></b-row>

                <b-row>
                    <b-col class="label">직업</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.job">
                            <b-form-select-option v-for="(v, k) in frm.option.job" :key="k" :value="v">{{v}}</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">직장/학교명</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.office" /></b-col>

                    <b-col class="label short">부서/학과/<br />연구실명</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.department" /></b-col>

                    <b-col class="label">직급/학년</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.grade" /></b-col>

                    <b-col class="label short">지도/담당교수</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.tutor" /></b-col>

                    <b-col class="label short">추천인 Email</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.offer" /></b-col>

                    <b-col class="label short">추천인연구실</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.offer_lab" /></b-col>

                    <b-col class="label">가입경로</b-col>
                    <b-col class="type02"><b-form-input v-model="frm.join_route" /></b-col>

                    <b-col class="label">관심분야</b-col>
                    <b-col class="type11">
                        {{frm.interest}}<template v-if="frm.interest_etc">, {{frm.interest_etc}}</template>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card v-if="frm.is_admin" class="adform">
            <b-container>
                <b-row><b-col class="tit">관리자 정보</b-col></b-row>
                <b-row>
                    <b-col>
                        <b-form-checkbox switch size="lg" v-model="frm.user_mng.um_status" value="Y" unchecked-value="N">
                            <b v-if="frm.user_mng.um_status=='N'">비</b>활성
                        </b-form-checkbox>
                    </b-col>

                    <b-col class="label">직위</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.user_mng.um_position" id="um_position">
                            <b-form-select-option v-for="(p, k) in frm.mng_info.position" :key="k" :value="k">{{p}}</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">소속팀</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.user_mng.um_group" id="um_group">
                            <b-form-select-option v-for="(g, k) in frm.mng_info.group" :key="k" :value="k">{{g}}</b-form-select-option>
                        </b-form-select>
                    </b-col>

                    <b-col class="label">직책</b-col>
                    <b-col class="type02">
                        <b-form-select v-model="frm.user_mng.um_responsibility" id="um_responsibility">
                            <b-form-select-option :value="null">◖없음◗</b-form-select-option>
                            <b-form-select-option v-for="(p, k) in frm.mng_info.responsibility" :key="k" :value="k">{{p}}</b-form-select-option>
                        </b-form-select>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card>
            <b-container>
                <b-row><b-col class="tit">최근 주문 내역</b-col></b-row>
                <Order :list="order" :config="order_config" :mng_off="mng_off" class="cmain" />
            </b-container>
        </b-card>

        <b-card>
            <b-container>
                <b-row><b-col class="tit">최근 견적 내역</b-col></b-row>
                <Estimate :list="estimate" class="cmain" />
            </b-container>
        </b-card>

        <transition name="modal">
            <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="900">
                <template slot="header">마일리지 목록</template>
                <Mileage />
            </Modal>
        </transition>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmUserEdit',
    components: {
        'Modal': () => import('@/views/_common/Modal.vue'),
        'Mileage': () => import('./_comp/Mileage.vue'),
        'Order': () => import('@/views/admin/shop/order/_comp/List.vue'),
        'Estimate': () => import('@/views/admin/shop/estimate/_comp/List.vue'),
    },

    data() {
        return {
            id:this.$route.params.id,
            isModalViewed: false,
            frm: {
                option: [],
                user_mng: {},
            },
            order: [],
            order_config: {},
            mng_off:[],
            
            estimate: [],
        };
    },

    methods: {
        async edit() {
            const user = await ax.get(`/api/admin/user/${this.id}/edit`);
            if (user && user.status === 200)
                this.frm = user.data;
            
            const od = await ax.get(`/api/admin/shop/order`, { params: {writer:this.id, limit:10}});
            if (od && od.status === 200) {
                this.order = od.data.list;
                this.order_config = od.data.order_config;
                this.mng_off = od.data.mng_off;
            }
            
            const eq = await ax.get(`/api/admin/shop/estimate`, { params: {writer:this.id, limit:10}});
            if (eq && eq.status === 200) 
                this.estimate = eq.data.list;
        },

        async update() {
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/user/${this.id}`, this.frm);
            if (res && res.status === 200) {
                Notify.toast('success', '수정 완료');
            }

        }
    },

    async mounted() {
        this.edit();
        
    },

    beforeRouteUpdate (to, from, next) {
        // console.log(to, from);
        this.id = to.params.id;
        this.edit();
        next();
    },
}
</script>

<style lang="css" scoped>
.card.act_ctrl .row { align-items:center; }
.card.act_ctrl .row .col .type_icon { display:inline-block; margin-right:25px; }
.card.act_ctrl .row .col .type_icon svg { margin-right:10px; }

.card .row .checkbox01 >>> .custom-checkbox label { font-size:12px !important; }
.card .row .checkbox01 >>> .custom-checkbox label b { font-weight:900; }
.card .row .checkbox01,
.card .row .checkbox01 >>> .custom-checkbox { display:flex; align-items:center; }
.card .row .checkbox01 >>> .custom-checkbox .custom-control-label::before,
.card .row .checkbox01 >>> .custom-checkbox .custom-control-label::after { position:absolute; top:50%; transform:translateY(-50%); }
</style>
