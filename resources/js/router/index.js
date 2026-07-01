import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';

import adm from './adm';
import web from './web';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.APP_URL,
    scrollBehavior() { return { x: 0, y: 0 } },
    routes: [
        ...adm,
        ...web,

        {
            path: '*',
            name: 'Not Found',
            component:() => import('@/views/_common/error/NotFound'),
        },
    ],
})

// 관리자 접근 제한 (등급별 권한 관리)
const LEVEL_PERMISSIONS = {
    21: {
        home: 'adm_order_index',
        allowed: ['adm_order_index', 'adm_order_edit'],
    },
    22: {
        home: 'adm_stats_behavio',
        allowed: [
            'adm_goods_index', 'adm_goods_edit', 'adm_goods_create',
            'adm_category', 'adm_maker', 'adm_maker_edit', 'adm_purchaseAt',
            'adm_stats_behavio', 'adm_stats',
        ],
    },
};

router.beforeEach((to, from, next) => {
    if (!to.path.startsWith('/admin')) return next();

    if (!store.state.auth.isLoggedin) {
        Notify.modal('로그인이 필요한 서비스입니다.', 'danger');
        return next({ name: 'login', query: { redirect: to.path } });
    }

    const user = store.state.auth.user;

    if (!user.is_admin) {
        Notify.modal('관리자만 접근 할 수 있습니다.');
        return next('/');
    }

    const perm = LEVEL_PERMISSIONS[parseInt(user.level)];
    if (perm) {
        if (to.name === 'adm_main') return next({ name: perm.home });
        if (!perm.allowed.includes(to.name)) {
            Notify.modal('접근 권한이 없습니다.');
            return next({ name: perm.home });
        }
    }

    next();
});

export default router