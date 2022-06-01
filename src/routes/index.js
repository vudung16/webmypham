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
                path: ':id',
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
        path: '/search',
        component: WebviewLayout,
        meta: {
            title: "Tìm kiếm"
        },
        children: [
            {
                title: 'Tìm kiếm',
                path: '',
                name: 'Search',
                component: Search,
                meta: {
                    title: 'Tìm kiếm',
                }
            }
        ]
    },

    {
        path: '/account',
        component: WebviewLayout,
        meta: {
            middleware: [auth],
            title: "Tài khoản"
        },
        children: [
            {
                title: 'Tài khoản',
                path: '',
                name: 'Account',
                component: Account,
                meta: {
                    title: 'Tài khoản',
                }
            }
        ]
    },

    //các page admin
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
                title: 'Thể loại',
                path: 'category',
                name: 'CategoryAdmin',
                component: CategoryAdmin,
                meta: {
                    title: 'Thể loại',
                }
            },
            {
                title: 'Thương hiệu',
                path: 'brand',
                name: 'Brand',
                component: Brand,
                meta: {
                    title: 'Thương hiệu',
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

            // Sản phẩm
            {
                title: 'Sản phẩm',
                path: 'product',
                name: 'Product',
                component: Product,
                meta: {
                    title: 'Sản phẩm',
                }
            },
            {
                title: 'Thêm mới',
                path: 'product/create',
                name: 'ProductCreate',
                component: ProductCreate,
                meta: {
                    title: 'Thêm mới',
                }
            },
            {
                title: 'Chỉnh sửa',
                path: 'product/update',
                name: 'ProductUpdate',
                component: ProductUpdate,
                meta: {
                    title: 'Chỉnh sửa',
                }
            },

            //Đơn hàng
            {
                title: 'Đơn hàng',
                path: 'order',
                name: 'Order',
                component: Order,
                meta: {
                    title: 'Đơn hàng',
                }
            },
            {
                title: 'Chi tiết',
                path: 'order/detail',
                name: 'OrderDetail',
                component: OrderDetail,
                meta: {
                    title: 'Chi tiết',
                }
            },


            //User
            {
                title: 'Tài khoản',
                path: 'user',
                name: 'User',
                component: User,
                meta: {
                    title: 'Tài khoản',
                }
            },
            {
                title: 'Tài khoản',
                path: 'account',
                name: 'AccountAdmin',
                component: AccountAdmin,
                meta: {
                    title: 'Tài khoản',
                }
            },
            {
                title: 'Tạo mới',
                path: 'user/create',
                name: 'CreateUser',
                component: CreateUser,
                meta: {
                    title: 'Tạo mới',
                }
            },

            //Nhập kho
            {
                title: 'Nhập kho',
                path: 'import',
                name: 'ImportProduct',
                component: ImportProduct,
                meta: {
                    title: 'Nhập kho',
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
            title: 'Không tìm thấy trang'
        }
    },
    // {
    //     path: "error",
    //     name: 'Error404',
    //     component: Error404,
    //     meta: {
    //         title: 'Không tìm thấy trang'
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