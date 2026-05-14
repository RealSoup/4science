<template>
    <section class="science-application">
        <div class="section-header">
            <h2 class="title-top">Science</h2>
            <h2 class="title-bottom"><span>A</span>pplication</h2>
            <div class="header-line"></div>
        </div>

        <div class="card-grid">
            <div
                v-for="(item, index) in items"
                :key="index"
                class="card"
                :class="{ 'coming-soon': !item.active, 'has-image': item.image }"
                @click="item.active && item.link ? goTo(item.link) : null"
                :style="item.active && item.link ? 'cursor:pointer' : ''"
            >
                <!-- 이미지형 -->
                <template v-if="item.image">
                    <img :src="item.image" :alt="item.label" class="card-img" />
                    <div class="card-label-overlay">
                        <span>{{ item.label }}</span>
                    </div>
                </template>

                <!-- Coming Soon형 -->
                <template v-else>
                    <div class="coming-soon-bg"></div>
                    <span class="coming-soon-text">coming soon</span>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ScienceApplication',

    data() {
        return {
            // [수정] 실제 이미지 경로와 링크로 교체하세요
            items: [
                {
                    label: 'Menlo Systems',
                    image: '/img/application/optics.jpg',  // 실제 이미지 경로
                    active: true,
                    link: '/application/menlo',
                },
                {
                    label: '이화학기기',
                    image: '/img/application/chemistry.jpg', // 실제 이미지 경로
                    active: true,
                    link: '/application/chemistry',
                },
                {
                    label: '',
                    image: null,
                    active: false,
                    link: null,
                },
                {
                    label: '',
                    image: null,
                    active: false,
                    link: null,
                },
                {
                    label: '',
                    image: null,
                    active: false,
                    link: null,
                },
                {
                    label: '',
                    image: null,
                    active: false,
                    link: null,
                },
            ],
        };
    },

    methods: {
        goTo(link) {
            this.$router.push(link);
            // router 미사용 시: window.location.href = link;
        },
    },
};
</script>

<style scoped>
.science-application {
    padding: 48px 40px;
    max-width: 1500px;
    margin: 0 auto;
    font-family: 'Noto Sans KR', sans-serif;
}

/* 헤더 */
.section-header {
    margin-bottom: 32px;
}

.title-top { font-size: 28px; font-weight: 300; color: #0F86DA; margin: 0; line-height: 1.2; }
.title-bottom { font-size: 28px; font-weight: 700; color: #0F86DA; margin: 0 0 12px 0; line-height: 1.2; }
.title-bottom span { color:#51B94A; }

.header-line {
    width: 100%;
    height: 1px;
    background: #ddd;
}

/* 그리드 */
.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 24px;
}

/* 카드 공통 */
.card {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: 2px;
    background: #ccc;
}

/* 이미지형 카드 */
.card.has-image {
    border: 1px solid #e0e0e0;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.35s ease;
}

.card.has-image:hover .card-img {
    transform: scale(1.04);
}

.card-label-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.28);
    transition: background 0.3s;
}

.card.has-image:hover .card-label-overlay {
    background: rgba(0, 0, 0, 0.4);
}

.card-label-overlay span {
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-shadow: 0 1px 6px rgba(0,0,0,0.5);
}

/* Coming Soon 카드 */
.card.coming-soon {
    background: linear-gradient(135deg, #7a8fa6 0%, #a0b2c4 50%, #8fa3b8 100%);
    border: none;
}

.coming-soon-bg {
    position: absolute;
    inset: 0;
    /* 이미지에서 보이는 미묘한 대각선 패턴 */
    background: repeating-linear-gradient(
        135deg,
        rgba(255,255,255,0.04) 0px,
        rgba(255,255,255,0.04) 1px,
        transparent 1px,
        transparent 20px
    );
}

.coming-soon-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.05em;
}

/* 반응형 */
@media (max-width: 768px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .science-application {
        padding: 32px 20px;
    }
}

@media (max-width: 480px) {
    .card-grid {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .card-label-overlay span {
        font-size: 16px;
    }
}
</style>