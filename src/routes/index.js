import {createRouter, createWebHistory} from 'vue-router';
import auth from '../middleware/auth';
import {store} from "../stores";

import Home from '../pages/webview/Home/index.vue';
import WebviewLayout from "../pages/webview/layouts/WebviewLayout.vue";
import ProductDetail from "../pages/webview/Product/productDetail.vue";
import Cart from "../pages/webview/Cart/cart.vue";
import Category from '../pages/webview/Category/index.vue';
import Login from '../pages/webview/Login/login.vue';
import Register from '../pages/webview/Login/register.vue';
import Error404 from "../pages/webview/errors/Error404.vue";
import InfoUser from "../pages/webview/User/info.vue"

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
            middleware: [auth],
            title: "Giỏ Hàng"
        },
        // beforeEnter: (to, from, next) => {
        //     if(parseInt(to.params.id)) {
        //         next();
        //     }else{
        //         next({name: 'Error404'});
        //     }
        // },
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

    {
        path: '/user',
        component: WebviewLayout,
        meta: {
            middleware: [auth],
            title: "Tài khoản"
        },
        children: [
            {
                title: 'Thông tin tài khoản',
                path: 'info',
                name: 'InfoUser',
                component: InfoUser,
                meta: {
                    title: 'Cá nhân',
                }
            }
        ]
    },

    {
        path: '/login',
        component: WebviewLayout,
        meta: {
            title: "Đăng nhập"
        },
        children: [
            {
                title: 'Đăng nhập',
                path: '',
                name: 'Login',
                component: Login,
                meta: {
                    title: 'Đăng nhập',
                }
            }
        ]
    },

    {
        path: '/register',
        component: WebviewLayout,
        meta: {
            title: "Đăng Ký"
        },
        children: [
            {
                title: 'Đăng Ký',
                path: '',
                name: 'Register',
                component: Register,
                meta: {
                    title: 'Đăng Ký',
                }
            }
        ]
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'Error404',
        component: Error404,
        meta: {
            title: 'Không tìm thấy trang'
        }
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Than run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});

export default router