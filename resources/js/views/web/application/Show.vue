<template>
    <div class="application-show">

        <!-- 헤더 -->
        <div class="section-header">
            <h2 class="title-top">Science</h2>
            <h2 class="title-bottom"><span>A</span>pplication</h2>
            <div class="header-line"></div>
        </div>

        <template v-if="pageData">

            <!-- 1. 히어로 -->
            <div class="hero" :style="{ backgroundImage: `url(${pageData.hero.image})` }">
                <div class="hero-overlay">
                    <h1 class="hero-title">{{ pageData.hero.title }}</h1>
                    <p class="hero-desc" v-html="pageData.hero.desc"></p>
                </div>
            </div>

            <!-- 2. 탭 메뉴 (sticky) -->
            <div class="tab-wrap">
                <ul class="tab-list">
                    <li
                        v-for="(tab, idx) in pageData.tabs"
                        :key="idx"
                        class="tab-item"
                        :class="{ active: activeTab === idx }"
                        @click="scrollToSection(idx)"
                    >
                        {{ tab.label }}
                    </li>
                </ul>
            </div>

            <!-- 3. 섹션들 (모두 노출) -->
            <div
                v-for="(tab, idx) in pageData.tabs"
                :key="idx"
                :ref="`section_${idx}`"
                class="tab-section"
            >

                <!-- 핵심 기술 -->
                <div v-if="tab.type === 'tech'" class="section-tech">
                    <div class="tech-wrap">
                        <div class="tech-left">
                            <h3 class="section-title">{{ tab.title }}</h3>
                            <p class="section-desc" v-html="tab.desc"></p>
                        </div>
                        <div class="tech-right">
                            <div v-for="(item, i) in tab.items" :key="i" class="tech-item">
                                <div class="tech-item-header">
                                    <h4 class="tech-item-title">{{ item.title }}</h4>
                                    <button class="btn-more" @click="toggleItem(idx, i)">
                                        {{ expandedItems[`${idx}_${i}`] ? '접기' : '더 보기' }}
                                    </button>
                                </div>
                                <div class="tech-item-body" :class="{ expanded: expandedItems[`${idx}_${i}`] }">
                                    <p class="tech-item-desc" v-html="item.desc"></p>
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
                            <div
                                class="tech-item-body project-body"
                                :class="{ expanded: expandedItems[`${idx}_0`] }"
                            >
                                <p class="project-desc" v-html="tab.desc"></p>
                            </div>
                            <button class="btn-more-outline" @click="toggleItem(idx, 0)">
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
                            <div
                                class="tech-item-body basic-body"
                                :class="{ expanded: expandedItems[`${idx}_${i}`] }"
                            >
                                <p class="basic-card-desc" v-html="item.desc"></p>
                            </div>
                            <button class="btn-more-outline" @click="toggleItem(idx, i)">
                                {{ expandedItems[`${idx}_${i}`] ? '접기' : '더 보기' }}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </template>

        <div v-else-if="loadError" class="not-found">
            해당 페이지를 찾을 수 없습니다.
        </div>

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

    beforeDestroy() {
        if (this.observer) this.observer.disconnect();
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
    },
};
</script>

<style scoped>
.application-show { font-family: 'Noto Sans KR', sans-serif; max-width: 1500px; margin: 0 auto; padding: 48px 40px; }
/* 헤더 */
.section-header { margin-bottom: 32px; }
.title-top { font-size: 28px; font-weight: 300; color: #0F86DA; margin: 0; line-height: 1.2; }
.title-bottom { font-size: 28px; font-weight: 700; color: #0F86DA; margin: 0 0 12px 0; line-height: 1.2; }
.title-bottom span { color:#51B94A; }
.header-line { width: 100%; height: 1px; background: #ddd; margin-bottom: 32px; }
/* 히어로 */
.hero { position: relative; width: 100%; height: 320px; background-size: cover; background-position: center; border-radius: 8px; overflow: hidden; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 32px 36px; }
.hero-title { font-size: 36px; font-weight: 900; color: #fff; margin: 0 0 10px 0; letter-spacing: -0.02em; }
.hero-desc { font-size: 13px; color: rgba(255,255,255,0.85); line-height: 1.7; margin: 0; max-width: 680px; }

/* 탭 sticky */
.tab-wrap { position: sticky; top: 126px; z-index: 100; background: #1a2e4a; margin: 0 -40px; padding: 0 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.18); }
.tab-list { list-style: none; margin: 0; padding: 0; display: flex; }
.tab-item { padding: 15px 28px; font-size: 14px; color: rgba(255,255,255,0.65); cursor: pointer; border-bottom: 3px solid transparent; transition: all 0.2s; white-space: nowrap; }
.tab-item:hover { color: #fff; background: rgba(255,255,255,0.06); }
.tab-item.active { color: #fff; font-weight: 700; border-bottom-color: #2db84b; }

/* 섹션 공통 */
.tab-section { padding: 60px 0; border-bottom: 1px solid #eee; }
.tab-section:last-child { border-bottom: none; }
.section-title { font-size: 34px; font-weight: 900; color: #51B94A; margin: 0 0 16px 0; }
.section-desc { font-size: 13px; color: #666; line-height: 1.8; margin: 0; }
/* 핵심 기술 */
.tech-wrap { display: grid; grid-template-columns: 220px 1fr; gap: 48px; }
.tech-item { background: #f7f8fa; border-radius: 6px; padding: 20px 24px; margin-bottom: 16px; }
.tech-item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.tech-item-title { font-size: 20px; font-weight: 700; color: #0F86DA; margin: 0; }
.btn-more { font-size: 12px; color: #888; background: none; border: 1px solid #ddd; border-radius: 3px; padding: 3px 10px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
.btn-more:hover { border-color: #2db84b; color: #2db84b; }
/* 아코디언 본문 */
.tech-item-body { overflow: hidden; max-height: 5.4em; transition: max-height 0.35s ease; position: relative; }
.tech-item-body::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 32px; background: linear-gradient(transparent, #f7f8fa); transition: opacity 0.3s; }
.tech-item-body.expanded { max-height: 2000px !important; }
.tech-item-body.expanded::after { opacity: 0; }
/* 기초 카드는 배경 흰색이라 페이드 색상 별도 */
.tech-item-body.basic-body::after { background: linear-gradient(transparent, #fff); }
.tech-item-body.project-body::after { background: linear-gradient(transparent, #fff); }
.tech-item-desc { font-size: 13px; color: #555; line-height: 1.7; margin: 0; }

/* 제품 솔루션 */
.section-product { background: #1a2e4a; border-radius: 8px; padding: 40px; margin: 0 -40px; }
.product-title { font-size: 24px; font-weight: 900; color: #fff; margin: 0 0 10px 0; }
.product-desc { font-size: 13px; color: rgba(255,255,255,0.7); margin: 0 0 28px 0; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.product-card { background: rgba(255,255,255,0.08); border-radius: 6px; aspect-ratio: 3 / 4; overflow: hidden; position: relative; }
.product-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.product-card-label { position: absolute; bottom: 0; left: 0; right: 0; padding: 10px 12px; background: rgba(0,0,0,0.5); color: #fff; font-size: 13px; font-weight: 600; }

/* 주요 프로젝트 */
.project-wrap { display: grid; grid-template-columns: 1fr 380px; gap: 48px; align-items: start; }
.project-wrap .project-left .project-body { max-height: 12.4em; }
.project-wrap .project-left .project-body.project-desc { font-size: 13px; color: #555; line-height: 1.8; margin: 0 0 24px 0; }
.project-wrap .project-right { padding-top: 58px; }
.project-wrap .project-right .project-img { width: 100%; height: auto; display: block; border-radius: 6px; border: 1px solid #e0e0e0; }
.btn-more-outline { font-size: 13px; color: #444; background: none; border: 1px solid #ccc; border-radius: 4px; padding: 8px 20px; cursor: pointer; }
.btn-more-outline:hover { border-color: #2db84b; color: #2db84b; }

/* 기초 */
.basic-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 24px; align-items: start; }
.basic-card { border: 1px solid #e0e0e0; border-radius: 6px; padding: 24px; min-width: 0; }
.basic-card-title { font-size: 16px; font-weight: 700; color: #1a9e36; margin: 0 0 12px 0; padding-bottom: 12px; border-bottom: 2px solid #2db84b; display: inline-block; }
.basic-card-desc { font-size: 13px; color: #555; line-height: 1.8; margin: 0 0 20px 0; }
::v-deep h6 { font-style: italic; }
.not-found { padding: 80px 0; text-align: center; color: #999; font-size: 15px; }
@media (max-width: 900px) {
    .application-show { padding: 32px 20px; }
    .tab-wrap { margin: 0 -20px; padding: 0 20px; }
    .tech-wrap,
    .project-wrap { grid-template-columns: 1fr; }
    .product-grid { grid-template-columns: repeat(2, 1fr); }
    .basic-grid { grid-template-columns: 1fr; }
    .section-product { margin: 0 -20px; padding: 28px 20px; }
}
</style>