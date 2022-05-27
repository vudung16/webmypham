<template>
    <div style="background: #ffffff; padding-bottom: 25px">
        <div class="breadCrumb-header">
            <div class="collapsed-button">
                <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
                    <MenuUnfoldOutlined v-if="collapsed" />
                    <MenuFoldOutlined v-else />
                </a-button>
            </div>
            <a-breadcrumb :routes="
                (checkPath() === 1 && routes1) ||
                (checkPath() === 2 && routes2) ||
                (checkPath() === 3 && routes3) ||
                (checkPath() === 4 && routes4) ||
                (checkPath() === 5 && routes5) ||
                (checkPath() === 6 && routes6) ||
                (checkPath() === 7 && routes7) ||
                (checkPath() === 8 && routes8) ||
                (checkPath() === 9 && routes9)
            
            ">
                <template #itemRender="{ route, params, routes, paths }">
                    <span v-if="routes.indexOf(route) === routes.length - 1">
                        {{ route.breadcrumbName }}
                    </span>
                    <router-link v-else :to="paths.join('/')">
                        {{ route.breadcrumbName }}
                    </router-link>
                </template>
            </a-breadcrumb>
        </div>
        <div class="breadcrumb-bottom">
            <a-row>
                <a-col :lg="{ span: 14 }">
                    <div class="text-overflow header-title" v-if="title">{{ title }}</div>
                    <div>
                        <slot name="title"></slot>
                    </div>
                </a-col>
                <a-col :lg="{ span: 10 }">
                    <div style="float: right; margin-right: 50px;">
                        <slot name="action"></slot>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
export default {
    components: { MenuFoldOutlined, MenuUnfoldOutlined },
    props: {
        title: {
            type: String,
        },
    },
    data() {
        return {
            collapsed: false,
            routes1: [
                {
                    path: "/admin",
                    breadcrumbName: "Trang chủ",
                },
            ],
            routes2: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/voucher",
                    breadcrumbName: "Voucher",
                },
            ],
            routes3: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/product",
                    breadcrumbName: "Sản phẩm",
                },
            ],
            routes4: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/brand",
                    breadcrumbName: "Thương hiệu",
                },
            ],
            routes5: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/category",
                    breadcrumbName: "Danh mục",
                },
            ],
            routes6: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/slide",
                    breadcrumbName: "Slide",
                },
            ],
            routes7: [
                {
                    path: "dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/order",
                    breadcrumbName: "Đơn hàng",
                },
            ],
            routes8: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/account",
                    breadcrumbName: "Thông tin tài khoản",
                },
            ],
            routes9: [
                {
                    path: "/dashboard",
                    breadcrumbName: "Trang chủ",
                },
                {
                    path: "/admin/import",
                    breadcrumbName: "Nhập kho",
                },
            ],
        };
    },
    methods: {
        checkPath() {
            const { path } = this.$route;
            if (path.includes("voucher")) {
                return 2;
            }
            if (path.includes("product")) {
                return 3;
            }
            if (path.includes("brand")) {
                return 4;
            }
            if (path.includes("category")) {
                return 5;
            }
            if (path.includes("slide")) {
                return 6;
            }
            if (path.includes("order")) {
                return 7;
            }
            if (path.includes("account")) {
                return 8;
            }
            if (path.includes("import")) {
                return 9;
            }
        },
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            this.$emitter.emit("toggle-sidebar", this.collapsed);
        }
    }
};
</script>
<style lang="scss">
.breadCrumb-header {
    display: flex;
    padding: 15px;

    .collapsed-button {
        margin-right: 20px;
    }

    .ant-breadcrumb {
        font-size: 16px !important;
    }
}

.breadcrumb-bottom {
    .header-title {
        font-size: 22px;
        margin-left: 45px;
    }
}
</style>