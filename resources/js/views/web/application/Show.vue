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
                <li v-for="(tab, idx) in pageData.tabs" :key="idx" class="tab-item" :class="{ active: activeTab === idx }" @click="scrollToSection(idx)">
                    {{ tab.label }}
                </li>
            </ul>
        </div>

        <!-- 3. 섹션들 (모두 노출) -->
        <div v-for="(tab, idx) in pageData.tabs" :key="idx" :ref="`section_${idx}`" class="tab-section">

            <!-- 핵심 기술 -->
            <div v-if="tab.type === 'tech'" class="section-tech">
                <div class="tech-wrap">
                    <div class="tech-left">
                        <h3 class="section-title">{{ tab.title }}</h3>
                        <p class="section-desc" v-html="tab.desc"></p>
                    </div>
                    <div class="tech-right">
                        <div v-for="(item, i) in tab.items" :key="i" class="tech-item">
                            <h4>{{ item.title }}</h4>
                            <div class="tech-item-body" :class="{ expanded: expandedItems[`${idx}_${i}`] }">
                                <p class="tech-item-desc" v-html="item.desc"></p>
                                <button class="btn-more" @click="toggleItem(idx, i)">
                                    {{ expandedItems[`${idx}_${i}`] ? '접기' : '더 보기' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 제품 솔루션 -->
            <div v-else-if="tab.type === 'product'" class="section-product">
                <div class="product-header">
                    <h3 class="product-title">{{ tab.title }}</h3>
                    <p class="product-desc" v-html="tab.desc"></p>
                </div>
                <div class="product-grid">
                    <div v-for="(item, i) in tab.items" :key="i" class="product-card">
                        <img v-if="item.image" :src="item.image" :alt="item.title" />
                        <div class="product-card-label">{{ item.title }}</div>
                    </div>
                </div>
            </div>

            <!-- 주요 프로젝트 -->
            <div v-else-if="tab.type === 'project'" class="section-project">
                <div class="project-wrap">
                    <div class="project-left">
                        <h3 class="section-title">주요 프로젝트</h3>
                        <h6>{{ tab.title }}</h6>
                        <div class="tech-item-body project-body" :class="{ expanded: expandedItems[`${idx}_0`] }">
                            <p class="project-desc" v-html="tab.desc"></p>
                        </div>
                        <button class="btn-more" @click="toggleItem(idx, 0)">
                            {{ expandedItems[`${idx}_0`] ? '접기' : '더 보기' }}
                        </button>
                    </div>
                    <div class="project-right">
                        <img :src="tab.image" :alt="tab.title" class="project-img" />
                    </div>
                </div>
            </div>

            <!-- 기초 -->
            <div v-else-if="tab.type === 'basic'" class="section-basic">
                <h3 class="section-title">{{ tab.title }}</h3>
                <div class="basic-grid">
                    <div v-for="(item, i) in tab.items" :key="i" class="basic-card">
                        <h4 class="basic-card-title">{{ item.title }}</h4>
                        <div class="basic-body" :class="{ expanded: expandedItems[`${idx}_${i}`] }">
                            <p class="basic-card-desc" v-html="item.desc"></p>
                        </div>
                        <button class="btn-more" @click="toggleItem(idx, i)">
                            {{ expandedItems[`${idx}_${i}`] ? '접기' : '더 보기' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="loadError" class="not-found">
        해당 페이지를 찾을 수 없습니다.
    </div>
</template>

<script>
export default {
    name: 'ApplicationShow',

    data() {
        return {
            activeTab: 0,
            activeSubTab: 0,
            pageData: null,
            loadError: false,
            observer: null,
            expandedItems: {},  // { '섹션idx_아이템idx': true/false }
            isSticky: false,
        };
    },

    watch: {
        '$route.params': {
            immediate: true,
            handler({ menu, con }) {
                this.loadData(menu, con);
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
        async loadData(menu, con) {
            this.pageData = null;
            this.loadError = false;
            this.activeTab = 0;
            this.activeSubTab = 0;
            this.expandedItems = {};
            try {
                const mod = await import(
                    /* webpackInclude: /con_.*\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${menu}/con_${con}.js`
                );
                this.pageData = mod.default;
                this.$nextTick(() => this.initObserver());
            } catch (e) {
                console.error('Show.vue loadData 오류:', e);
                console.error('menu:', menu, 'con:', con);
                this.loadError = true;
            }
        },

        toggleItem(sectionIdx, itemIdx) {
            const key = `${sectionIdx}_${itemIdx}`;
            this.$set(this.expandedItems, key, !this.expandedItems[key]);
        },

        scrollToSection(idx) {
            const ref = this.$refs[`section_${idx}`];
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
                            const idx = parseInt(entry.target.dataset.idx);
                            this.activeTab = idx;
                        }
                    });
                },
                { rootMargin: '-30% 0px -60% 0px' }
            );
            this.pageData.tabs.forEach((_, idx) => {
                const ref = this.$refs[`section_${idx}`];
                const el = Array.isArray(ref) ? ref[0] : ref;
                if (el) {
                    el.dataset.idx = idx;
                    this.observer.observe(el);
                }
            });
        },
        onScroll() {
            const tabEl = this.$el.querySelector('.tab-wrap');
            if (!tabEl) return;
            const rect = tabEl.getBoundingClientRect();
            this.isSticky = rect.top <= 126; // sticky top 값과 동일하게
        },
    },
};
</script>

<style scoped>
.show-wrap { border:1px solid #959595; border-radius:40px 40px 0 0; }
/* 히어로 */
.hero { position:relative; width:100%; height:500px; background-size:cover; background-position:center; border-radius:40px 40px 0 0; }
.hero .hero-overlay { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:24px 36px; }
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
.tab-section .btn-more { font-size: 16px; color: #000; border: 1px solid #888; padding: 2px 9px; background:inherit; }
.tab-section .btn-more:hover { border-color: #2db84b; color: #2db84b; }

/* 핵심 기술 */
.section-tech .tech-wrap { display:grid; grid-template-columns:320px 1fr; gap:24px; }
.section-tech .tech-wrap .tech-left { display:flex; flex-direction:column; justify-content:center; }
.section-tech .tech-wrap .tech-right .tech-item { background:#EBEBEB; border-radius:20px; padding:25px 24px 36px; }
.section-tech .tech-wrap .tech-right > * + * { margin-top: 16px; }
.section-tech .tech-wrap .tech-right .tech-item h4 { font-size:22px; font-weight: 700; color:#0F86DA; margin: 0; margin-bottom: 10px; }
/* 아코디언 본문 */
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body { overflow:hidden; max-height:4.5em; transition:max-height 0.35s ease; position: relative; display: grid; grid-template-columns: 1fr 100px; gap: 15px; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body.expanded { max-height: 2000px !important; }
/* 기초 카드는 배경 흰색이라 페이드 색상 별도 */
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc { font-size:16px; color: #000; line-height:1.55; margin: 0; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .tech-item-desc::v-deep h6 { margin-bottom: 3px; font-style: italic; }
.section-tech .tech-wrap .tech-right .tech-item .tech-item-body .btn-more { position: absolute; right:14px; bottom: 0; }

/* 제품 솔루션 */
.section-product { background: linear-gradient(to right, #004B82, #1A1663); padding:45px 40px 50px; }
.section-product .product-header .product-title { font-size:32px; font-weight:900; color: #fff; margin: 0 0 10px 0; }
.section-product .product-header .product-desc { font-size:16px; color:#fff; margin: 0 0 28px 0; }
.section-product .product-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.section-product .product-grid .product-card { background:#FFF; border-radius:28px; aspect-ratio: 3 / 4; overflow: hidden; position: relative; }
.section-product .product-grid .product-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.section-product .product-grid .product-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 12px; background: rgba(0,0,0,0.5); color: #fff; font-size: 13px; font-weight: 600; }

/* 주요 프로젝트 */
.section-project .project-wrap { display: grid; grid-template-columns: 1fr 444px; gap: 48px; align-items: start; }
.section-project .project-wrap .project-left h6 { margin-bottom:3px; font-style:italic; color:#000; font-size:18px; font-weight:700; }
.section-project .project-wrap .project-left .project-body { max-height:12.4em; overflow:hidden; }
.section-project .project-wrap .project-left .project-body.expanded { max-height: 2000px !important; }
.section-project .project-wrap .project-left .project-body .project-desc { color: #000; line-height: 1.8; margin: 0 0 24px 0; }
.section-project .project-wrap .project-right { padding-top: 58px; }
.section-project .project-wrap .project-right .project-img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #e0e0e0; }

/* 기초 */
.section-basic { background:#EBEBEB; }
.section-basic .basic-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px; align-items: start; }
.section-basic .basic-card { border:1px solid #e0e0e0; border-radius: 6px; padding: 24px; min-width: 0; background:#FFF; }
.section-basic .basic-card .basic-body { overflow:hidden; max-height:4.5em; }
.section-basic .basic-card .basic-body.expanded { max-height: 2000px !important; }
.section-basic .basic-card .basic-card-title { font-size: 20px; font-weight:700; margin:0 0 12px 0; display:inline-block; background:#0094EA; position:relative; left:-30px; color:#FFF; font-style:italic; padding:8px 28px; border-radius:0 20px 20px 0; }
.section-basic .basic-card .basic-body .basic-card-desc { font-size: 13px; color: #555; line-height: 1.8; margin: 0 0 20px 0; }
.section-basic .basic-card .basic-body .basic-card-desc::v-deep img { width:100%; }

.not-found { padding: 80px 0; text-align: center; color: #999; font-size: 15px; }

@media (max-width: 900px) {
    .application-show { padding:32px 20px; }
    .tab-wrap { padding:0; overflow:hidden; }
    .tech-wrap,
    .project-wrap { grid-template-columns: 1fr; }
    .product-grid { grid-template-columns: repeat(2, 1fr); }
    .basic-grid { grid-template-columns: 1fr; }
    .section-product { padding: 28px 20px; }
}
</style>