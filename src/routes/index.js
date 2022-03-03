import {createRouter, createWebHistory} from 'vue-router';

import Home from '../pages/webview/Home/index.vue';
import WebviewLayout from "../pages/webview/layouts/WebviewLayout.vue";
import ProductDetail from "../pages/webview/Product/productDetail.vue";
import Cart from "../pages/webview/Cart/cart.vue";
import Category from '../pages/webview/Category/index.vue';


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
    },

    {
        path: '/cart',
        component: WebviewLayout,
        meta: {
            title: "Giỏ Hàng"
        },
        children: [
            {
                title: 'Cart',
                path: '',
                name: 'Cart',
                component: Cart,
                meta: {
                    title: 'Giỏ Hàng',
                }
            }
        ]
    },

    {
        path: '/checkout',
        component: WebviewLayout,
        meta: {
            title: "Checkout"
        },
        children: [
            {
                title: 'Checkout',
                path: '/',
                name: 'Checkout',
                component: Cart,
                meta: {
                    title: 'Checkout',
                }
            }
        ]
    },

    {
        path: '/category',
        component: WebviewLayout,
        meta: {
            title: "Thể loại"
        },
        children: [
            {
                title: 'Thể loại',
                path: 'cate/:id',
                name: 'Category',
                component: Category,
                meta: {
                    title: 'Thể loại',
                }
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router