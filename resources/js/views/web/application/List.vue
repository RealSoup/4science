<template>
    <div v-if="current" class="content-wrap">

        <!-- 좌: 분야 제목 + 설명 + 이미지 -->
        <div class="col-left">
            <h3 class="field-title" v-html="current.name"></h3>
            <p class="field-desc" v-html="current.desc"></p>
            <div class="field-img-wrap">
                <img :src="current.image" :alt="current.title" class="field-img" />
            </div>
        </div>

        <!-- 중: 카테고리 메뉴 -->
        <div class="col-mid">
            <ul class="category-list">
                <li v-for="(cat, key) in current.bundles" :key="key"
                    class="category-item" :class="{ active: selectedIdx === key }"
                    @mouseenter="hoverCat({ key, ...cat }, key)" @click="goToShow({ key, ...cat })"
                >
                    <span>{{ cat.name }}</span>
                    <span class="arrow">▶</span>
                </li>
            </ul>
        </div>

        <!-- 우: 호버된 카테고리 이미지 + 설명 (list.js bundles에서 바로) -->
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
</template>

<script>
export default {
    name: 'ApplicationList',

    data() {
        return {
            selectedIdx: 0,
            current: null,
            hoveredCat: null,
            loadError: false,
        };
    },

    watch: {
        '$route.params.part': {
            immediate: true,
            handler(part) {
                this.loadList(part);
            },
        },
    },

    methods: {
        async loadList(part) {
            this.current = null;
            this.hoveredCat = null;
            this.selectedIdx = null;
            this.loadError = false;
            try {
                const mod = await import(
                    /* webpackInclude: /part_info\.js$/ */
                    /* webpackChunkName: "application" */
                    `./${part}/part_info.js`
                );
                this.current = mod.info;
                
                // 첫 번째 카테고리 자동 선택
                const firstKey = Object.keys(this.current.bundles)[0];
                if (firstKey) {
                    this.hoverCat({ key: firstKey, ...this.current.bundles[firstKey] }, firstKey);
                }
            } catch (e) {
                console.error('List.vue loadList 오류:', e);
                console.error('part:', part);
                this.loadError = true;
            }
        },

        hoverCat(cat, key) {
            this.selectedIdx = key;
            this.hoveredCat = cat;
        },

        goToShow(cat) {
            const { part } = this.$route.params;
            this.$router.push(`/application/${part}/${cat.key}`);
        },
    },
};
</script>

<style scoped>
.content-wrap { display: grid; grid-template-columns: 410px 1fr 540px; gap: 0; border-top: 1px solid #959595; min-height: 500px; }
.col-left { padding: 30px 24px 32px 0; border-right: 1px solid #959595; }
.field-title { font-size: 62px; font-weight: 900; color: #000; margin: 0 0 8px 0; }
.field-desc { font-size: 16.5px; font-weight: bold; color: #000; line-height: 1.65; margin: 0 0 20px 0; }
.field-img-wrap { width: 100%; max-width: 300px; }
.field-img { width: 100%; height: auto; display: block; border-radius: 2px; }
.content-wrap .col-mid { border-right: 1px solid #ddd; }
.content-wrap .col-mid .category-list { padding: 26px 0; }
.content-wrap .col-mid .category-list .category-item { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 20px; font-size: 18px; color: #000; cursor: pointer; border-bottom: 1px solid #f0f0f0; transition: background 0.15s; text-align: right; }
.content-wrap .col-mid .category-list .category-item:hover { background: #f7fdf8; }
.content-wrap .col-mid .category-list .category-item.active { background: #e8f5eb; font-weight: 900; font-size: 20px; }
.content-wrap .col-mid .category-list .category-item .arrow { color: #FFF; font-size: 20px; flex-shrink: 0; margin: 0 4px 0 9px; }
.content-wrap .col-mid .category-list .category-item.active .arrow { color: #2db84b; }
.col-right { padding: 38px 0 32px 88px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; }
.guide-text { color: #bbb; font-size: 14px; margin: auto; }
.cat-img-wrap { width: 100%; margin-bottom: 19px; border: 1px solid #e0e0e0; border-radius: 2px; overflow: hidden; }
.cat-img { width: 100%; height: auto; display: block; }
.cat-desc { font-size: 17px; font-weight: bold; color: #000; line-height: 1.7; text-align: right; }
.not-found { padding: 80px 0; text-align: center; color: #999; font-size: 15px; }

@media (max-width: 900px) {
    .content-wrap { grid-template-columns: 1fr; }
    .col-left { border-right: none; border-bottom: 1px solid #ddd; padding: 24px 0; }
    .col-mid { border-right: none; border-bottom: 1px solid #ddd; }
    .col-right { border-right: none; border-bottom: 1px solid #ddd; padding: 24px 16px; }
    .field-title { font-size: 36px; }
    .content-wrap .col-mid .category-list .category-item { justify-content: space-between; text-align: left; }
}
</style>