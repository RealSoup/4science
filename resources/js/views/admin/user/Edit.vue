<template>
    <div>
        <h3>회원 정보 수정</h3>
        <b-card no-body class="shadow mb-2 sticky-top p-2">
            <b-container fluid>
                <b-row>
                    <b-col cols="12" sm="6"><b-button size="sm" variant="danger" @click="destroy">삭제</b-button></b-col>
                    <b-col cols="12" sm="6" class="text-right">
                        <b-button-group size="sm">
                            <b-button size="sm" variant="light" :to="{name: 'adm_user'}"><b-icon-list-ol />목록</b-button>
                            <b-button size="sm" variant="primary" @click="update"><b-icon-pencil-square />수정 완료</b-button>
                        </b-button-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>

        <b-card class="shadow mt-3 user">
            <template #header>
                <h4>회원 정보</h4>
            </template>
            <b-container fluid>
                <b-row>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" >
                        <div>
                            <span v-b-tooltip.hover title="회원고유번호"><font-awesome-icon icon="tags" />{{ frm.id }}</span>
                            <span v-b-tooltip.hover title="가입일"><b-icon-calendar2-date-fill />{{ frm.created_at | formatDate }}</span>
                        </div>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.group" id="group">
                            <b-form-select-option value="">◖회원 유형◗</b-form-select-option>
                            <b-form-select-option value="일반">일반</b-form-select-option>
                            <b-form-select-option value="특별">특별</b-form-select-option>
                            <b-form-select-option value="미수">미수</b-form-select-option>
                            <b-form-select-option value="후불">후불</b-form-select-option>
                        </b-form-select>
                        <label for="group">회원 유형</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.level" id="level">
                            <b-form-select-option value="0">◖회원등급◗</b-form-select-option>
                            <b-form-select-option v-for="(grade, k) in frm.option.grade" :key="k" :value="k">{{grade}}</b-form-select-option>
                        </b-form-select>
                        <label for="level">회원등급</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.mng" id="mng">
                            <b-form-select-option value="0">◖담당자◗</b-form-select-option>
                            <b-form-select-option v-for="(v, k) in frm.mng_list" :key="k" :value="v.id">{{v.name}}</b-form-select-option>
                        </b-form-select>
                        <label for="mng">담당자</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.name" id="name" required />
                        <label for="name">이름</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.email" id="email" required />
                        <label for="email">이메일</label>
                    </b-col>
                    <b-col col xl="1" lg="2" sm="3" cols="6" class="checkbox01">
                        <b-form-checkbox v-model="frm.receive_mail" id="receive_mail" value="Y" unchecked-value="N" size="lg">
                            수신 동의 <b v-if="frm.receive_mail=='N'">안함</b>
                        </b-form-checkbox>
                    </b-col>
                    <b-col col xl="1" lg="2" sm="3" cols="6">
                        <b-form-checkbox v-model="frm.sex" button value="male" unchecked-value="female">
                            <b v-if="frm.sex == 'male'">남</b><b v-else>여</b>자
                        </b-form-checkbox>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p force">
                        <b-input-group size="sm">
                            <b-form-input v-model="frm.birth" id="birth" placeholder="YYYY-MM-DD" autocomplete="off" :formatter="formatDate" required></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker v-model="frm.birth" size="sm" button-only right></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                        <label for="birth">생년월일</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.tel" id="tel" required />
                        <label for="tel">일반전화</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.hp" id="hp" required />
                        <label for="hp">휴대폰</label>
                    </b-col>
                    <b-col col xl="1" lg="2" sm="3" cols="6" class="checkbox01">
                        <b-form-checkbox v-model="frm.receive_sms" id="receive_sms" value="Y" unchecked-value="N" size="lg">
                            수신 동의 <b v-if="frm.receive_sms=='N'">안함</b>
                        </b-form-checkbox>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.fax" id="fax" required />
                        <label for="fax">팩스</label>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <hr />
                    </b-col>
                </b-row>

                <b-row>
                    <b-col col lg="2" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.job" id="um_position">
                            <b-form-select-option v-for="(v, k) in frm.option.job" :key="k" :value="v">{{v}}</b-form-select-option>
                        </b-form-select>
                        <label for="um_position">직업</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.office" id="office" required />
                        <label for="office">직장/학교명</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.department" id="department" required />
                        <label for="department">부서/학과/연구실명</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.grade" id="grade" required />
                        <label for="grade">직급/학년</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.tutor" id="tutor" required />
                        <label for="tutor">지도/담당교수</label>
                    </b-col>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.offer" id="offer" required />
                        <label for="offer">추천인 Email</label>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col col xl="2" lg="2" md="3" sm="4" cols="6" class="awesome_p">
                        <b-form-input v-model="frm.offer_lab" id="offer_lab" required />
                        <label for="offer_lab">추천인연구실</label>
                    </b-col>
                    <b-col col lg="2" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.join_route" id="um_position">
                            <b-form-select-option v-for="(v, k) in frm.option.join_route" :key="k" :value="v">{{v}}</b-form-select-option>
                        </b-form-select>
                        <label for="join_route">가입경로</label>
                    </b-col>
                    <b-col class="awesome_p force pt-2">
                        {{frm.interest}}<template v-if="frm.interest_etc">, {{frm.interest_etc}}</template>
                        <label for="office">관심분야</label>
                    </b-col>
                </b-row>



                <b-row>
                    <b-col>
                        <b-button @click="isModalViewed = !isModalViewed">마일리지</b-button>
                    </b-col>
                </b-row>
            </b-container>
            <transition name="modalForm">
                <Modal v-if="isModalViewed" @close-modal="isModalViewed = false" :max_width="700">
                    <Mileage />
                </Modal>
            </transition>
        </b-card>
        
        <b-card v-if="frm.level > 19" class="shadow mt-3">
            <template #header>
                <h4>관리자 정보</h4>
            </template>
            <b-container fluid>
                <b-row>
                    <b-col col lg="2" cols="6">
                        <b-form-checkbox switch size="lg" v-model="frm.user_mng.um_status" value="Y" unchecked-value="N">
                            <b v-if="frm.user_mng.um_status=='N'">비</b>활성
                        </b-form-checkbox>
                    </b-col>                    
                    <b-col col lg="2" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.user_mng.um_position" id="um_position">
                            <b-form-select-option v-for="(p, k) in frm.user_mng.mng_info.position" :key="k" :value="k">{{p}}</b-form-select-option>
                        </b-form-select>
                        <label for="um_position">직위</label>
                    </b-col>
                    <b-col col lg="2" cols="6" class="awesome_p force">
                        <b-form-select v-model="frm.user_mng.um_group" id="um_group">
                            <b-form-select-option v-for="(g, k) in frm.user_mng.mng_info.group" :key="k" :value="k">{{g}}</b-form-select-option>
                        </b-form-select>
                        <label for="um_group">소속팀</label>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>    
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'AdmUserEdit',
    components: {
        'Modal': () => import('@/views/_common/Modal.vue'),
        'Mileage': () => import('./_comp/Mileage.vue'),
    },

    data() {
        return {
            isModalViewed: false,
            frm: {},
        };
    },

    mounted() {
        this.edit();
    },

    methods: {
        async edit() {
            const res = await ax.get(`/api/admin/user/${this.$route.params.id}/edit`);
            if (res && res.status === 200) {
                this.frm = res.data;
            }
        },
        async update() {
            this.frm = Object.assign(
                {}, // 빈 객체를 선언 함으로써, 새로운 메모리 위치로 재정의
                this.frm, // 수정하려는 객체
                {_method : 'PATCH'} // 삽입하려는 내용
            );
            const res = await ax.post(`/api/admin/user/${this.$route.params.id}`, this.frm);
            if (res && res.status === 200) {
                
            }

        }
    },
}
</script>

<style lang="css" scoped>
.user .row { margin-bottom:1rem; }
.card .row .col div span { margin-right:1rem; }
.card .row .col div span svg { margin-right:0.5rem; }
.card .row .col div.awesome_p.force,
.card .row .col div select { display:inline-block; width:auto; }
.card .row .checkbox01 >>> .custom-checkbox label { font-size:12px !important; }
.card .row .checkbox01 >>> .custom-checkbox label b { font-weight:900; }
.card .row .checkbox01,
.card .row .checkbox01 >>> .custom-checkbox { display:flex; align-items:center; }
.card .row .checkbox01 >>> .custom-checkbox .custom-control-label::before,
.card .row .checkbox01 >>> .custom-checkbox .custom-control-label::after { position:absolute; top:50%; transform:translateY(-50%); }


.modalForm-enter-active,
.modalForm-leave-active { transition: opacity .3s; }
.modalForm-enter,
.modalForm-leave-to { opacity: 0; }
</style>