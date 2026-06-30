<template>
    <div v-if="pageData" class="show-wrap">
        <!-- 1. 히어로 -->
        <div class="hero" :style="{ backgroundImage: `url(${pageData.hero.image})` }">
            <div class="hero-overlay">
                <h1 class="hero-title">{{ pageData.hero.title }}</h1>
                <p class="hero-desc" v-html="pageData.hero.desc"></p>
            </div>
        </div>

        <!-- 2. 탭 메뉴 (sticky) -->
        <div class="tab-wrap" :class="{ sticky: isSticky }">
            <ul class="tab-list">
                <li v-for="key in tabOrder" :key="key" class="tab-item" :class="{ active: activeTab === key }" @click="scrollToSection(key)">
                    {{ tabLabels[key] }}
                </li>
            </ul>
        </div>

        <!-- 3. 섹션들 -->
        <div v-for="key in tabOrder" :key="key" :ref="`section_${key}`" class="tab-section">
            <template v-if="pageData.tabs[key]">

                <!-- 핵심 기술 -->
                <div v-if="key === 'tech'" class="section-tech">
                    <div class="tech-wrap" v-for="(item, i) in pageData.tabs.tech" :key="i" :class="{ no_1st: i!=0 }">
                        <div class="tech-left">
                            <h3 class="section-title">{{ item.title }}</h3>
                            <p class="section-desc" v-html="item.desc"></p>
                        </div>
                        <div class="tech-right">
                            <div v-for="(item, i) in item.items" :key="i" class="tech-item">
                                <h4 v-html="item.title"></h4>
                                <div class="tech-item-body" :class="{ expanded: expandedItems[`tech_${i}`] }">
                                    <p class="tech-item-desc" v-html="item.desc"></p>
                                </div>
                                <button class="btn-more" @click="toggleItem('tech', i)">
                                    {{ expandedItems[`tech_${i}`] ? '접기' : '더 보기' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 제품 솔루션 -->
                <div v-else-if="key === 'product'" class="section-product">
                    <div class="product-header">
                        <h3 class="product-title">{{ pageData.tabs.product.title }}</h3>
                        <p class="product-desc" v-html="pageData.tabs.product.desc"></p>
                    </div>
                    <div class="product-grid">
                        <div v-for="(item, i) in pageData.tabs.product.items" :key="i" class="product-card">
                            <b-link :to="{ name: 'goods_show', params: {gd_id: item.gd_id} }">
                                <img :src="item.image_src_thumb[0]" :alt="item.gd_name" />
                            </b-link>
                            
                            <div class="product-card-label">{{ item.gd_name }}</div>
                        </div>
                    </div>
                </div>

                <!-- 주요 프로젝트 -->
                <div v-else-if="key === 'project'" class="section-project">
                    <div class="project-wrap">
                        <div class="project-left">
                            <h3 class="section-title">주요 프로젝트</h3>
                            <h6>{{ pageData.tabs.project.title }}</h6>
                            <div class="project-body" :class="{ expanded: expandedItems['project_0'] }">
                                <p class="project-desc" v-html="pageData.tabs.project.desc"></p>
                            </div>
                            <button class="btn-more" @click="toggleItem('project', 0)">
                                {{ expandedItems['project_0'] ? '접기' : '더 보기' }}
                            </button>
                        </div>
                        <div class="project-right">
                            <img v-if="pageData.tabs.project.image" :src="pageData.tabs.project.image" :alt="pageData.tabs.project.title" class="project-img" />
                            <small v-if="pageData.tabs.project.img_desc" v-html="pageData.tabs.project.img_desc"></small>
                        </div>
                    </div>
                </div>

                <!-- 기초 -->
                <div v-else-if="key === 'basic'" class="section-basic">
                    <h3 class="section-title">{{ pageData.tabs.basic.title }}</h3>
                    <div class="basic-grid">
                        <div v-for="(item, i) in pageData.tabs.basic.items" :key="i" class="basic-card">
                            <h4 class="basic-card-title">{{ item.title }}</h4>
                            <div class="basic-body" :class="{ expanded: expandedItems[`basic_${i}`] }">
                                <p class="basic-card-desc" v-html="item.desc"></p>
                            </div>
                            <button class="btn-more" @click="toggleItem('basic', i)">
                                {{ expandedItems[`basic_${i}`] ? '접기' : '더 보기' }}
                            </button>
                        </div>
                    </div>
                </div>

            </template>
        </div>
    </div>
    <div v-else-if="loadError" class="not-found">
        해당 페이지를 찾을 수 없습니다.
    </div>
</template>

<script>
import ax from '@/api/http';

export default {
    name: 'ApplicationShow',

    data() {
        return {
            activeTab: 'tech',
            pageData: null,
            loadError: false,
            observer: null,
            expandedItems: {},
            isSticky: false,
            tabOrder: ['tech', 'product', 'project', 'basic'],
            tabLabels: {
                tech: '핵심 기술',
                product: '제품 솔루션',
                project: '주요 프로젝트',
                basic: '기초',
            },
        };
    },

    watch: {
        '$route.params': {
            immediate: true,
            handler({ part, bundle }) {
                this.loadData(part, bundle);
            },
        },
    },

    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },

    beforeDestroy() {
        if (this.observer) this.observer.disconnect();
        window.removeEventListener('scroll', this.onScroll);
    },

    methods: {
        async loadData(part, bundle) {
            this.pageData = null;
            this.loadError = false;
            this.activeTab = 'tech';
            this.expandedItems = {};
            if (!part || !bundle) return;
            try {
                const mod = await import(
                    /* webpackInclude: /bundle_.*\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${part}/bundle_${bundle}.js`
                );
                this.pageData = mod.info;

                await ax.post(`/api/shop/goods/goodsList`, {gd_ids:this.pageData.tabs.product.gd_ids})
                .then(response => { this.pageData.tabs.product.items = response.data; })
                .catch(error => { console.error('불러오기 실패:', error); });

                this.$nextTick(() => this.initObserver());
            } catch (e) {
                console.error('Show.vue loadData 오류:', e);
                console.error('part:', part, 'bundle:', bundle);
                this.loadError = true;
            }
        },

        toggleItem(tabKey, itemIdx) {
            const key = `${tabKey}_${itemIdx}`;
            this.$set(this.expandedItems, key, !this.expandedItems[key]);
        },

        scrollToSection(key) {
            const ref = this.$refs[`section_${key}`];
            const el = Array.isArray(ref) ? ref[0] : ref;
            if (!el) return;
            const tabHeight = 126 + 48;
            const top = el.getBoundingClientRect().top + window.scrollY - tabHeight - 16;
            window.scrollTo({ top, behavior: 'smooth' });
        },

        initObserver() {
            if (this.observer) this.observer.disconnect();
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.activeTab = entry.target.dataset.key;
                        }
                    });
                },
                { rootMargin: '-30% 0px -60% 0px' }
            );
            this.tabOrder.forEach(key => {
                if (!this.pageData.tabs[key]) return;
                const ref = this.$refs[`section_${key}`];
                const el = Array.isArray(ref) ? ref[0] : ref;
                if (el) {
                    el.dataset.key = key;
                    this.observer.observe(el);
                }
            });
        },

        onScroll() {
            const tabEl = this.$el.querySelector('.tab-wrap');
            if (!tabEl) return;
            const rect = tabEl.getBoundingClientRect();
            this.isSticky = rect.top <= 126;
        },
    },
};
</script>

<style scoped>
.show-wrap { border:1px solid #959595; border-radius:40px 40px 0 0; }
/* 히어로 */
.hero { position:relative; width:100%; height:500px; background-size:cover; background-position:center; border-radius:40px 40px 0 0; }
.hero .hero-overlay { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:24px 36px; background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 60%, transparent 100%); }
.hero .hero-overlay .hero-title { font-size:60px; font-weight: 900; color: #fff; margin: 0 0 15px 0; }
.hero .hero-overlay .hero-desc { font-size:18px; color:#fff; line-height:1.4; max-width:1200px; }

/* 탭 sticky */
.tab-wrap { position:sticky; top:126px; z-index:100; padding:0 40px; border-bottom:1px solid #CCCCCC; background:#FFF;; }
.tab-wrap.sticky { box-shadow:0 3px 11px rgba(0,0,0,0.7); }
.tab-wrap .tab-list { display:flex; }
.tab-wrap .tab-list .tab-item { padding:13px 28px 11px; font-size:20px; color: #000; cursor:pointer; border-bottom:5px solid transparent; transition: all 0.2s; white-space: nowrap; position:relative; top:3px; }
.tab-wrap .tab-list .tab-item.active { font-weight: 700; border-bottom-color: #2db84b; }

/* 섹션 공통 */
.tab-section .section-title { font-size:33px; font-weight:900; color: #4FBA48; margin: 0 0 16px 0; }
.tab-section .section-desc { font-size:17px; color:#000; line-height:1.54; margin:0; }
.tab-section > div { padding:44px; }
.tab-section .btn-more { font-size: 16px; color: #000; border: 1px solid #888; padding: 2px 9px; background:inherit; position: absolute; right: 33px; bottom: 8px; border-radius: 6px; }
.tab-section .btn-more:hover { border-color: #2db84b; color: #2db84b; }

/* 핵심 기술 */
.section-tech .tech-wrap { display:grid; grid-template-columns:320px 1fr; gap:24px; }
.section-tech .tech-wrap.no_1st { border-top:1px solid #959595; margin-top:15px; padding-top:15px; }
.section-tech .tech-wrap .tech-left { display:flex; flex-direction:column; justify-content:center; }
.section-tech .tech-wrap .tech-right .tech-item { background:#EBEBEB; border-radius:20px; padding:25px 24px 36px; position:relative; }
.section-tech .tech-wrap .tech-right > * + * { margin-top: 16px; }
.section-tech .tech-wrap .tech-right .tech-item h4 { font-size:22px; font-weight: 700; color:#0F86DA; margin: 0; margin-bottom: 10px; }
/* 아코디언 본문 */
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body { overflow:hidden; max-height:4.5em; transition:max-height 0.35s ease; position: relative; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body.expanded { max-height: 2000px !important; }
/* 기초 카드는 배경 흰색이라 페이드 색상 별도 */
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc { font-size:16px; color: #000; line-height:1.55; margin: 0; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc::v-deep h6 { margin-bottom: 3px; font-style: italic; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc::v-deep ul { list-style: disc; padding:10px 26px; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc::v-deep ul li { list-style: disc; padding: 4px 0; }

/* 제품 솔루션 */
.section-product { background: linear-gradient(to right, #004B82, #1A1663); padding:45px 40px 50px; }
.section-product .product-header .product-title { font-size:32px; font-weight:900; color: #fff; margin: 0 0 10px 0; }
.section-product .product-header .product-desc { font-size:16px; color:#fff; margin: 0 0 28px 0; }
.section-product .product-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.section-product .product-grid .product-card { background:#FFF; border-radius:28px; aspect-ratio: 3 / 4; overflow: hidden; position: relative; }
.section-product .product-grid .product-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.section-product .product-grid .product-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 12px; background: rgba(0,0,0,0.5); 
    color: #fff; font-size: 13px; font-weight: 600; min-height: 60px; display: flex; align-items: center; }

/* 주요 프로젝트 */
.section-project .project-wrap { display: grid; grid-template-columns: 1fr 444px; gap: 48px; align-items: start; }
.section-project .project-wrap .project-left { position:relative; padding-bottom: 24px; }
.section-project .project-wrap .project-left h6 { margin-bottom:3px; font-style:italic; color:#000; font-size:18px; font-weight:700; }
.section-project .project-wrap .project-left .project-body { max-height:12.4em; overflow:hidden; }
.section-project .project-wrap .project-left .project-body.expanded { max-height: 2000px !important; }
.section-project .project-wrap .project-left .project-body .project-desc { color: #000; line-height: 1.8; margin: 0 0 24px 0; }
.section-project .project-wrap .project-left .project-body .project-desc::v-deep h6 { margin-bottom:3px; font-style:italic; color:#000; font-size:18px; font-weight:700; }
.section-project .project-wrap .project-left .project-body .project-desc::v-deep img { display: block; margin:auto; }
.section-project .project-wrap .project-left .project-body .project-desc::v-deep small { color:#777; max-width:700px; margin:auto; text-align:center; display:block; }
.section-project .project-wrap .project-left .btn-more { bottom: -16px; }
.section-project .project-wrap .project-right { padding-top: 58px; text-align:center; }
.section-project .project-wrap .project-right .project-img { margin:auto; max-width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #e0e0e0; }


/* 기초 */
.section-basic { background:#EBEBEB; }
.section-basic .basic-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px; align-items: start; }
.section-basic .basic-card { border:1px solid #e0e0e0; border-radius: 6px; padding:24px 24px 44px;; min-width: 0; background:#FFF; position:relative; }
.section-basic .basic-card .basic-body { overflow:hidden; max-height:6em; }
.section-basic .basic-card .basic-body.expanded { max-height: 2000px !important; }
.section-basic .basic-card .basic-card-title { font-size: 20px; font-weight:700; margin:0 0 12px 0; display:inline-block; background:#0094EA; position:relative; left:-30px; color:#FFF; font-style:italic; padding:8px 28px; border-radius:0 20px 20px 0; }
.section-basic .basic-card .basic-body .basic-card-desc { font-size: 17px; color: #000; line-height: 1.8; margin: 0 0 20px 0; }
.section-basic .basic-card .basic-body .basic-card-desc::v-deep img { width:100%; }

.not-found { padding: 80px 0; text-align: center; color: #999; font-size: 15px; }

@media (max-width: 900px) {
    .tab-wrap { padding: 0; overflow-x: auto; top: 60px; }
    .tab-wrap .tab-list .tab-item { padding: 10px 16px; font-size: 15px; }

    .tab-section > div { padding: 24px 16px; }
    .tab-section .section-title { font-size: 24px; }

    .hero { height: 280px; }
    .hero .hero-overlay { padding: 16px 20px; }
    .hero .hero-overlay .hero-title { font-size: 32px; margin: 0 0 8px 0; }
    .hero .hero-overlay .hero-desc { font-size: 14px; }

    .section-tech .tech-wrap { grid-template-columns: 1fr; }
    .section-tech .tech-wrap.no_1st { margin-top: 10px; padding-top: 10px; }

    .section-product { padding: 24px 16px; }
    .section-product .product-grid { grid-template-columns: repeat(2, 1fr); }

    .section-project .project-wrap { grid-template-columns: 1fr; gap: 24px; }
    .section-project .project-wrap .project-right { padding-top: 0; }

    .section-basic .basic-grid { grid-template-columns: 1fr; }
    .section-basic .basic-card .basic-card-title { left: -16px; }
    .section-tech .tech-wrap .tech-right .tech-item .tech-item-body { grid-template-columns: 1fr; }
    .section-tech .tech-wrap .tech-right .tech-item .tech-item-body .btn-more { position: static; margin-top: 8px; }
}
</style>