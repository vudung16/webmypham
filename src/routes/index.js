import {createRouter, createWebHistory} from 'vue-router';

import Home from '../pages/webview/Home/index.vue';
import WebviewLayout from "../pages/webview/layouts/WebviewLayout.vue";
import ProductDetail from "../pages/webview/Product/productDetail.vue";


const routes = [
    {
        path: '/',
        component: WebviewLayout,
        meta: {
            title: "Trang chủ"
        },
        children: [
            {
                title: 'Home',
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Trang chủ',
                }
            }
        ]
    },

    {
        path: '/product',
        component: WebviewLayout,
        meta: {
            title: "Chi tết sản phẩm"
        },
        children: [
            {
                title: 'Chi tết sản phẩm',
                path: 'product-detail/:id',
                name: 'ProductDetail',
                component: ProductDetail,
                meta: {
                    title: 'Chi tiết sản phẩm',
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router