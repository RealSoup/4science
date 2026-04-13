<template>
    <div class="synonym-wrap">
        <h2 class="page-title">동의어 관리</h2>

        <!-- 상태 -->
        <div class="card">
            <div class="status-row">
                <span class="status-badge">
                    <span class="dot"></span>
                    ES 동의어 적용 중 · {{ totalCount }}개 등록됨
                </span>
                <button class="btn btn-reload" @click="reloadES">
                    🔄 ES 동의어 즉시 반영
                </button>
            </div>
        </div>

        <!-- 추가 -->
        <div class="card">
            <p class="card-title">동의어 추가</p>
            <div class="form-group">
                <label class="form-label">동의어 목록 (쉼표로 구분)</label>
                <textarea
                    v-model="newSynonym"
                    class="form-textarea"
                    placeholder="예) 피펫, 피벳, 피페트, pipette, pipet"
                ></textarea>
                <span class="hint">쉼표로 구분하여 입력하세요.</span>
            </div>
            <div class="btn-row">
                <button class="btn btn-primary" @click="saveSynonym">저장</button>
                <button class="btn btn-reload-sm" @click="saveAndReload">저장 + 즉시 반영</button>
            </div>
        </div>

        <!-- 목록 -->
        <div class="card">
            <p class="card-title">등록된 동의어 목록 (총 {{ totalCount }}개)</p>
            <div class="search-row">
                <input v-model="searchKeyword" class="search-input" placeholder="키워드 검색..." @keyup.enter="onSearch" />
                <button class="btn btn-primary" @click="onSearch">검색</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>동의어 그룹</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in synonymList" :key="index">
                        <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                        <td>
                            <!-- 수정 모드 -->
                            <input
                                v-if="editId === item.id"
                                v-model="editKeyword"
                                class="form-input"
                                style="width:100%"
                            >
                            <!-- 일반 모드 -->
                            <div v-else class="keyword-chips">
                                <span class="chip" v-for="(kw, i) in item.keywords" :key="i">{{ kw }}</span>
                            </div>
                        </td>
                        <td>
                            <!-- 수정 모드 -->
                            <template v-if="editId === item.id">
                                <button class="btn btn-primary" @click="updateSynonym(item)">저장</button>
                                <button class="btn btn-cancel" @click="cancelEdit">취소</button>
                            </template>
                            <!-- 일반 모드 -->
                            <template v-else>
                                <button class="btn btn-edit" @click="startEdit(item)">수정</button>
                                <button class="btn btn-danger" @click="deleteSynonym(item)">삭제</button>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 페이지네이션 -->
            <div class="pagination" v-if="lastPage > 1">
                <button class="page-btn" :disabled="currentPage === 1" @click="changePage(1)">❮❮</button>
                <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">❮</button>
                <button
                    class="page-btn"
                    v-for="page in pageNumbers"
                    :key="page"
                    :class="{ active: page === currentPage }"
                    @click="changePage(page)"
                >{{ page }}</button>
                <button class="page-btn" :disabled="currentPage === lastPage" @click="changePage(currentPage + 1)">❯</button>
                <button class="page-btn" :disabled="currentPage === lastPage" @click="changePage(lastPage)">❯❯</button>
            </div>
        </div>
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    data() {
        return {
            newSynonym: '',
            searchKeyword: '',
            totalCount: 0,
            synonymList: [],
            currentPage: 1,
            lastPage: 1,
            perPage: 50,
            editId: null,
            editKeyword: '',
        }
    },
    computed: {
        pageNumbers() {
            const range = 5;
            let start = Math.max(1, this.currentPage - Math.floor(range / 2));
            let end = Math.min(this.lastPage, start + range - 1);
            if (end - start < range - 1) start = Math.max(1, end - range + 1);
            const pages = [];
            for (let i = start; i <= end; i++) pages.push(i);
            return pages;
        }
    },
    methods: {
        async fetchList() {
            const res = await ax.get('/api/admin/site/synonym', {
                params: {
                    page: this.currentPage,
                    search: this.searchKeyword,
                }
            });
            this.synonymList = res.data.list;
            this.totalCount = res.data.total;
            this.lastPage = res.data.last_page;
        },
        async saveSynonym() {
            if (!this.newSynonym.trim()) return alert('동의어를 입력해주세요.');
            await ax.post('/api/admin/site/synonym', { keywords: this.newSynonym });
            this.newSynonym = '';
            this.fetchList();
            alert('저장됐습니다! ES 반영 버튼을 눌러야 검색에 적용됩니다.');
        },
        async saveAndReload() {
            if (!this.newSynonym.trim()) return alert('동의어를 입력해주세요.');
            await ax.post('/api/admin/site/synonym', { keywords: this.newSynonym });
            this.newSynonym = '';
            await this.reloadES();
            this.fetchList();
        },
        async deleteSynonym(item) {
            if (!confirm('삭제하시겠어요?')) return;
            await ax.delete(`/api/admin/site/synonym/${item.id}`, { data: { keyword: item.raw } });
            this.fetchList();
        },
        async reloadES() {
            await ax.post('/api/admin/site/synonym/reload');
            alert('ES 동의어가 반영됐습니다!');
        },
        startEdit(item) {
            this.editId = item.id;
            this.editKeyword = item.raw;
        },
        cancelEdit() {
            this.editId = null;
            this.editKeyword = '';
        },
        async updateSynonym(item) {
            if (!this.editKeyword.trim()) return alert('동의어를 입력해주세요.');
            await ax.put(`/api/admin/site/synonym/${item.id}`, {
                keyword: this.editKeyword,
                old_keyword: item.raw,
            });
            this.editId = null;
            this.editKeyword = '';
            this.fetchList();
        },
        changePage(page) {
            if (page < 1 || page > this.lastPage) return;
            this.currentPage = page;
            this.fetchList();
        },
        onSearch() {
            this.currentPage = 1;
            this.fetchList();
        },
    },
    mounted() {
        this.fetchList();
    },
}
</script>

<style scoped>
.synonym-wrap { padding: 24px; }
.page-title { font-size: 20px; font-weight: 500; margin-bottom: 20px; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.card-title { font-size: 14px; font-weight: 500; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb; }
.status-row { display: flex; justify-content: space-between; align-items: center; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: #0F6E56; background: #E1F5EE; padding: 6px 12px; border-radius: 20px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #1D9E75; display: inline-block; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.form-label { font-size: 12px; color: #6b7280; }
.form-textarea { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; resize: vertical; min-height: 70px; width: 100%; outline: none; font-family: inherit; }
.form-textarea:focus { border-color: #1D9E75; }
.hint { font-size: 11px; color: #9ca3af; }
.btn-row { display: flex; gap: 8px; }
.btn { padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: opacity 0.15s; }
.btn:hover { opacity: 0.85; }
.btn-primary { background: #1D9E75; color: #fff; }
.btn-reload { background: #378ADD; color: #fff; }
.btn-reload-sm { background: #378ADD; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; }
.btn-danger { background: #E24B4A; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none; }
.btn-edit { background: #6b7280; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none; margin-right: 4px; }
.btn-cancel { background: #9ca3af; color: #fff; padding: 5px 10px; font-size: 12px; border-radius: 6px; cursor: pointer; border: none; margin-left: 4px; }
.form-input { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; outline: none; }
.form-input:focus { border-color: #1D9E75; }
.search-row { display: flex; gap: 8px; margin-bottom: 14px; }
.search-input { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none; }
.search-input:focus { border-color: #1D9E75; }
.search-row .btn { white-space: nowrap; padding: 8px 16px; min-width: 60px; }
.table { width: 100%; border-collapse: collapse; font-size: 13px; }
.table th { font-size: 12px; font-weight: 500; color: #6b7280; padding: 8px 10px; text-align: left; border-bottom: 1px solid #e5e7eb; background: #f9fafb; }
.table td { padding: 10px; border-bottom: 1px solid #e5e7eb; vertical-align: middle; }
.table tr:last-child td { border-bottom: none; }
.table tr:hover td { background: #f9fafb; }
.keyword-chips { display: flex; flex-wrap: wrap; gap: 4px; }
.chip { display: inline-block; padding: 2px 8px; background: #E1F5EE; color: #085041; border-radius: 4px; font-size: 11px; }
.pagination { display: flex; justify-content: center; align-items: center; gap: 4px; margin-top: 16px; }
.page-btn { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 6px; background: #fff; font-size: 13px; cursor: pointer; }
.page-btn:hover:not(:disabled) { background: #f3f4f6; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-btn.active { background: #1D9E75; color: #fff; border-color: #1D9E75; }
</style>