import Vue from 'vue';
import Router from 'vue-router';

import adm from './adm';
import web from './web';

Vue.use(Router)
export default new Router({
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
    ]
})
