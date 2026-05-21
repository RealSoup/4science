<template>
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
                <img src="/storage/application/comming soon.jpg" alt="comming soon" />
                <span class="coming-soon-text">coming soon</span>
            </template>
        </div>
    </div>
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
                    image: '/storage/application/menlo/main.webp',  // 실제 이미지 경로
                    active: true,
                    link: '/application/menlo',
                },
                {
                    label: '이화학기기',
                    image: '/storage/application/chemistry/main.jpg', // 실제 이미지 경로
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
.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 65px 114px; border-top: 1px solid #959595; padding: 40px 60px; }
.card { position: relative; aspect-ratio: 4 / 3; overflow: hidden; border-radius: 2px; background: #ccc; }
.card.has-image { border: 1px solid #e0e0e0; }
.card-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s ease; }
.card.has-image:hover .card-img { transform: scale(1.04); }
.card-label-overlay { border: 1px solid #000; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: background 0.3s; }
.card.has-image:hover .card-label-overlay { background: rgba(0, 0, 0, 0.4); }
.card-label-overlay span { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: 0.08em; text-shadow: 0 1px 6px rgba(0,0,0,0.5); }
.card.coming-soon { border: none; }
.coming-soon-text { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #FFF; font-size: 28px; font-weight: 900; }

@media (max-width: 768px) {
    .card-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 20px; }
}

@media (max-width: 480px) {
    .card-grid { grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; }
    .card-label-overlay span { font-size: 14px; }
    .coming-soon-text { font-size: 16px; }
}
</style>