import {createRouter, createWebHashHistory} from 'vue-router';
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';
import {store} from "../stores";

import Home from '../pages/webview/Home/index.vue';
import WebviewLayout from "../pages/webview/layouts/WebviewLayout.vue";
import ProductDetail from "../pages/webview/Product/productDetail.vue";
import Cart from "../pages/webview/Cart/cart.vue";
import Category from '../pages/webview/Category/index.vue';
import Login from '../pages/webview/Login/login.vue';
import Forgot from '../pages/webview/Login/forgot.vue';
import Register from '../pages/webview/Login/register.vue';
import Search from '../pages/webview/Category/Search.vue';
import Error404 from "../pages/webview/errors/Error404.vue";
import InfoUser from "../pages/webview/User/info.vue";
import Account from "../pages/webview/User/Account.vue";

//admin
import AdminLayout from "../pages/admin/layouts/AdminLayout.vue";
import Dashboard from '../pages/admin/Dashboard/index.vue';
import Slide from '../pages/admin/Slide/index.vue';
import Brand from '../pages/admin/Brand/index.vue';
import Voucher from '../pages/admin/Voucher/index.vue';
import VoucherCreate from '../pages/admin/Voucher/create.vue';
import VoucherUpdate from '../pages/admin/Voucher/update.vue';
import Product from '../pages/admin/Product/index.vue';
import ProductCreate from '../pages/admin/Product/create.vue';
import ProductUpdate from '../pages/admin/Product/update.vue';
import Order from '../pages/admin/Order/index.vue';
import OrderDetail from '../pages/admin/Order/detail.vue';
import CategoryAdmin from '../pages/admin/Category/index.vue';
import AccountAdmin from '../pages/admin/User/AccountAdmin.vue';
import User from '../pages/admin/User/Index.vue';
import CreateUser from '../pages/admin/User/create.vue';
import ImportProduct from '../pages/admin/Import/ImportProduct.vue';
import LoginFacebook from '../pages/webview/Login/LoginFacebook.vue';

const routes = [
    {
        path: '/',
        component: WebviewLayout,
        meta: {
            title: "Trang ch???"
        },
        children: [
            {
                title: 'Home',
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Trang ch???',
                }
            }
        ]
    },

    {
        path: '/product',
        component: WebviewLayout,
        meta: {
            title: "Chi t???t s???n ph???m"
        },
        children: [
            {
                title: 'Chi t???t s???n ph???m',
                path: 'product-detail/:id',
                name: 'ProductDetail',
                component: ProductDetail,
                meta: {
                    title: 'Chi ti???t s???n ph???m',
                }
            }
        ]
    },

    {
        path: '/cart',
        component: WebviewLayout,
        meta: {
            middleware: [auth],
            title: "Gi??? H??ng"
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
                    title: 'Gi??? H??ng',
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
            title: "Th??? lo???i"
        },
        children: [
            {
                title: 'Th??? lo???i',
                path: ':id',
                name: 'Category',
                component: Category,
                meta: {
                    title: 'Th??? lo???i',
                }
            }
        ]
    },

    {
        path: '/user',
        component: WebviewLayout,
        meta: {
            middleware: [auth],
            title: "T??i kho???n"
        },
        children: [
            {
                title: 'Th??ng tin t??i kho???n',
                path: 'info',
                name: 'InfoUser',
                component: InfoUser,
                meta: {
                    title: 'C?? nh??n',
                }
            }
        ]
    },

    {
        path: '/login',
        component: WebviewLayout,
        meta: {
            title: "????ng nh???p"
        },
        children: [
            {
                title: '????ng nh???p',
                path: '',
                name: 'Login',
                component: Login,
                meta: {
                    title: '????ng nh???p',
                }
            }
        ]
    },

    {
        path: '/login-facebook',
        component: WebviewLayout,
        meta: {
            title: "????ng nh???p Facebook"
        },
        children: [
            {
                title: '????ng nh???p Facebook',
                path: '',
                name: 'LoginFacebook',
                component: LoginFacebook,
                meta: {
                    title: '????ng nh???p Facebook',
                }
            }
        ]
    },

    {
        path: '/forgot',
        component: WebviewLayout,
        meta: {
            title: "Qu??n m???t kh???u"
        },
        children: [
            {
                title: 'Qu??n m???t kh???u',
                path: '',
                name: 'Forgot',
                component: Forgot,
                meta: {
                    title: 'Qu??n m???t kh???u',
                }
            }
        ]
    },

    {
        path: '/register',
        component: WebviewLayout,
        meta: {
            title: "????ng K??"
        },
        children: [
            {
                title: '????ng K??',
                path: '',
                name: 'Register',
                component: Register,
                meta: {
                    title: '????ng K??',
                }
            }
        ]
    },

    {
        path: '/search',
        component: WebviewLayout,
        meta: {
            title: "T??m ki???m"
        },
        children: [
            {
                title: 'T??m ki???m',
                path: '',
                name: 'Search',
                component: Search,
                meta: {
                    title: 'T??m ki???m',
                }
            }
        ]
    },

    {
        path: '/account',
        component: WebviewLayout,
        meta: {
            middleware: [auth],
            title: "T??i kho???n"
        },
        children: [
            {
                title: 'T??i kho???n',
                path: '',
                name: 'Account',
                component: Account,
                meta: {
                    title: 'T??i kho???n',
                }
            }
        ]
    },

    //c??c page admin
    {
        path: '/admin',
        component: AdminLayout,
        meta: {
            middleware: [authAdmin],
            title: "Admin"
        },
        children: [
            {
                title: 'Dashboard',
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    title: 'Dashboard',
                }
            },
            {
                title: 'Slide',
                path: 'slide',
                name: 'Slide',
                component: Slide,
                meta: {
                    title: 'Slide',
                }
            },
            {
                title: 'Th??? lo???i',
                path: 'category',
                name: 'CategoryAdmin',
                component: CategoryAdmin,
                meta: {
                    title: 'Th??? lo???i',
                }
            },
            {
                title: 'Th????ng hi???u',
                path: 'brand',
                name: 'Brand',
                component: Brand,
                meta: {
                    title: 'Th????ng hi???u',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher',
                name: 'Voucher',
                component: Voucher,
                meta: {
                    title: 'Voucher',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher/create',
                name: 'VoucherCreate',
                component: VoucherCreate,
                meta: {
                    title: 'Voucher',
                }
            },
            {
                title: 'Voucher',
                path: 'voucher/update',
                name: 'VoucherUpdate',
                component: VoucherUpdate,
                meta: {
                    title: 'Voucher',
                }
            },

            // S???n ph???m
            {
                title: 'S???n ph???m',
                path: 'product',
                name: 'Product',
                component: Product,
                meta: {
                    title: 'S???n ph???m',
                }
            },
            {
                title: 'Th??m m???i',
                path: 'product/create',
                name: 'ProductCreate',
                component: ProductCreate,
                meta: {
                    title: 'Th??m m???i',
                }
            },
            {
                title: 'Ch???nh s???a',
                path: 'product/update',
                name: 'ProductUpdate',
                component: ProductUpdate,
                meta: {
                    title: 'Ch???nh s???a',
                }
            },

            //????n h??ng
            {
                title: '????n h??ng',
                path: 'order',
                name: 'Order',
                component: Order,
                meta: {
                    title: '????n h??ng',
                }
            },
            {
                title: 'Chi ti???t',
                path: 'order/detail',
                name: 'OrderDetail',
                component: OrderDetail,
                meta: {
                    title: 'Chi ti???t',
                }
            },


            //User
            {
                title: 'T??i kho???n',
                path: 'user',
                name: 'User',
                component: User,
                meta: {
                    title: 'T??i kho???n',
                }
            },
            {
                title: 'T??i kho???n',
                path: 'account',
                name: 'AccountAdmin',
                component: AccountAdmin,
                meta: {
                    title: 'T??i kho???n',
                }
            },
            {
                title: 'T???o m???i',
                path: 'user/create',
                name: 'CreateUser',
                component: CreateUser,
                meta: {
                    title: 'T???o m???i',
                }
            },

            //Nh???p kho
            {
                title: 'Nh???p kho',
                path: 'import',
                name: 'ImportProduct',
                component: ImportProduct,
                meta: {
                    title: 'Nh???p kho',
                }
            },
        ]
    },



    // error 404 not found
    {
        path: "/:pathMatch(.*)*",
        name: 'Error404',
        component: Error404,
        meta: {
            title: 'Kh??ng t??m th???y trang'
        }
    },
    // {
    //     path: "error",
    //     name: 'Error404',
    //     component: Error404,
    //     meta: {
    //         title: 'Kh??ng t??m th???y trang'
    //     }
    // },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    store: store
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
            store
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});

export default router