<template>
    <section class="science-application-detail">

        <div class="section-header">
            <h2 class="title-top">Science</h2>
            <h2 class="title-bottom"><span>A</span>pplication</h2>
            <div class="header-line"></div>
        </div>

        <div v-if="current" class="content-wrap">

            <!-- 좌: 분야 제목 + 설명 + 이미지 -->
            <div class="col-left">
                <h3 class="field-title">{{ current.title }}</h3>
                <p class="field-desc" v-html="current.desc"></p>
                <div class="field-img-wrap">
                    <img :src="current.image" :alt="current.title" class="field-img" />
                </div>
            </div>

            <!-- 중: 카테고리 메뉴 -->
            <div class="col-mid">
                <ul class="category-list">
                    <li
                        v-for="(cat, idx) in current.categories"
                        :key="idx"
                        class="category-item"
                        :class="{ active: selectedIdx === idx }"
                        @mouseenter="hoverCat(cat, idx)"
                        @click="goToShow(cat)"
                    >
                        <span>{{ cat.name }}</span>
                        <span v-if="selectedIdx === idx" class="arrow">▶</span>
                    </li>
                </ul>
            </div>

            <!-- 우: 호버된 카테고리 이미지 + 설명 (list.js categories에서 바로) -->
            <div class="col-right">
                <template v-if="hoveredCat">
                    <div class="cat-img-wrap">
                        <img :src="hoveredCat.image" :alt="hoveredCat.name" class="cat-img" />
                    </div>
                    <p class="cat-desc" v-html="hoveredCat.desc"></p>
                </template>
                <div v-else class="guide-text">메뉴를 선택하세요</div>
            </div>

        </div>

        <div v-else-if="loadError" class="not-found">
            해당 페이지를 찾을 수 없습니다.
        </div>

    </section>
</template>

<script>
export default {
    name: 'ApplicationList',

    data() {
        return {
            selectedIdx: null,
            current: null,
            hoveredCat: null,
            loadError: false,
        };
    },

    watch: {
        '$route.params.menu': {
            immediate: true,
            handler(menu) {
                this.loadList(menu);
            },
        },
    },

    methods: {
        async loadList(menu) {
            this.current = null;
            this.hoveredCat = null;
            this.selectedIdx = null;
            this.loadError = false;
            try {
                const mod = await import(
                    /* webpackInclude: /list\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${menu}/list.js`
                );
                this.current = mod.fields;                
            } catch (e) {
                console.error('List.vue loadList 오류:', e);
                console.error('menu:', menu);
                this.loadError = true;
            }
        },

        hoverCat(cat, idx) {
            this.selectedIdx = idx;
            this.hoveredCat = cat;  // list.js categories 데이터 그대로 사용
        },

        goToShow(cat) {
            const { menu } = this.$route.params;
            this.$router.push(`/application/${menu}/${cat.key}`);
        },
    },
};
</script>

<style scoped>
/* List.vue */
.science-application-detail {
    padding: 48px 40px;
    max-width: 1500px;
    margin: 0 auto;
    font-family: 'Noto Sans KR', sans-serif;
}

.section-header {
    margin-bottom: 32px;
}

.title-top { font-size: 28px; font-weight: 300; color: #0F86DA; margin: 0; line-height: 1.2; }
.title-bottom { font-size: 28px; font-weight: 700; color: #0F86DA; margin: 0 0 12px 0; line-height: 1.2; }
.title-bottom span { color:#51B94A; }
.header-line { width: 100%; height: 1px; background: #ddd; }
.content-wrap {
    display: grid;
    grid-template-columns: 260px 1fr 320px;
    gap: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    min-height: 500px;
}

.col-left {
    padding: 32px 24px 32px 0;
    border-right: 1px solid #ddd;
}

.field-title {
    font-size: 36px;
    font-weight: 900;
    color: #222;
    margin: 0 0 16px 0;
    letter-spacing: -0.02em;
}

.field-desc {
    font-size: 13px;
    color: #555;
    line-height: 1.8;
    margin: 0 0 24px 0;
}

.field-img-wrap {
    width: 100%;
    max-width: 240px;
}

.field-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 2px;
}

.col-mid {
    border-right: 1px solid #ddd;
}

.category-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.category-item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 14px 20px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.15s;
    text-align: right;
}

.category-item:hover {
    background: #f7fdf8;
}

.category-item.active {
    background: #e8f5eb;
    font-weight: 700;
    color: #1a9e36;
}

.arrow {
    color: #2db84b;
    font-size: 11px;
    flex-shrink: 0;
}

.col-right {
    padding: 32px 0 32px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}

.guide-text {
    color: #bbb;
    font-size: 14px;
    margin: auto;
}

.cat-img-wrap {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
}

.cat-img {
    width: 100%;
    height: auto;
    display: block;
}

.cat-desc {
    font-size: 13px;
    color: #444;
    line-height: 1.9;
    text-align: center;
    margin: 0;
}

.not-found {
    padding: 80px 0;
    text-align: center;
    color: #999;
    font-size: 15px;
}

@media (max-width: 900px) {
    .content-wrap {
        grid-template-columns: 1fr;
    }

    .col-left,
    .col-mid,
    .col-right {
        border-right: none;
        border-bottom: 1px solid #ddd;
        padding: 24px 0;
    }

    .category-item {
        justify-content: space-between;
        text-align: left;
    }

    .science-application-detail {
        padding: 32px 20px;
    }
}
</style>