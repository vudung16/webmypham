<template>
    <div class="header-webview">
        <a-row class="header" align="middle">
            <a-col class="header-left" :span="6">
                <div @click="redirectHome">
                    <img src="../../../assets/images/logo.png" alt="">
                </div>
            </a-col>
            <a-col class="header-center" :span="7">
                <div>
                    <a-input-search v-model:value="search" placeholder="Tìm kiếm..." enter-button @search="onSearch" />
                </div>
            </a-col>
            <a-col class="header-right" :span="11">
                <div class="header-right-menu">
                    <div class="customer">
                        <img width="32" height="32"
                            src="https://theme.hstatic.net/200000411391/1000799987/14/phone-icon.png?v=209" alt="">
                        <div class="menu-content">
                            <div>Hỗ Trợ khách hàng</div>
                            <div>0386132297</div>
                        </div>
                    </div>
                    <div class="login">
                        <img width="32" height="32"
                            src="https://theme.hstatic.net/200000411391/1000799987/14/account-icon.png?v=209" alt="">
                        <div v-if="!user" class="menu-content">
                            <div><a @click="login">Đăng nhập</a></div>
                        </div>
                        <div v-else class="menu-content">
                            <div>{{ user.name }}</div>
                            <div>
                                <a-dropdown @click="toCarts">
                                    <template #overlay v-if="user">
                                        <a-menu>
                                            <a-menu-item @click="redirectAccount">
                                                <user-outlined />Cá nhân
                                            </a-menu-item>
                                            <a-menu-item @click="redirectCart()">
                                                <shopping-cart-outlined />Đơn hàng
                                            </a-menu-item>
                                            <a-menu-item @click="logout()">
                                                <logout-outlined />Đăng xuất
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                    <span class="quantity">Tài khoản</span>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="cart">
                        <a-dropdown @click="toCarts">
                            <template #overlay v-if="user">
                                <a-menu>
                                    <a-menu-item v-for="item in carts.carts" :key="item.index">
                                        <div class="product">
                                            <div class="img">
                                                <img width="40" height="40" v-bind:src="item.image" alt="">
                                            </div>
                                            <div class="detail">
                                                <div class="product-name">{{ item.name }}</div>
                                                <div class="product-price">{{ new Intl.NumberFormat('de-DE', {
                                                        style:
                                                            'currency', currency: 'VND'
                                                    }).format(item.discount ? item.price -
                                                        ((item.discount / 100) * item.price) : item.price)
                                                }} x {{
        item.quantity
}}</div>
                                            </div>
                                        </div>
                                    </a-menu-item>
                                    <a-menu-item>
                                        <div class="sum-price">Tổng: <span>{{ new Intl.NumberFormat('de-DE', {
                                                style:
                                                    'currency', currency: 'VND'
                                            }).format(carts.sum_price)
                                        }}</span></div>
                                        <div class="pay">
                                            <a-button @click="shoppingCart">Xem giỏ hàng >></a-button>
                                        </div>
                                    </a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                <img width="24" height="24"
                                    src="https://theme.hstatic.net/200000411391/1000799987/14/cart-icon.png?v=209"
                                    alt="">
                                <span>Giỏ hàng &nbsp;</span>
                                <span v-if="user" class="quantity">{{ carts.sum_quantity }}</span>
                            </a-button>
                        </a-dropdown>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row class="header-bottom">
            <div class="header-bottom-menu">
                <a-menu v-model:selectedKeys="current" mode="horizontal">
                    <a-sub-menu key="sub1">
                        <template #icon>
                            <AppstoreOutlined />
                        </template>
                        <template #title>Danh mục sản phẩm</template>
                        <a-menu-item v-for="cate in category" :key="cate.id" @click="redirectCategory(cate.id)">{{
                                cate.name
                        }}</a-menu-item>
                    </a-sub-menu>
                    <a-menu-item key="policy">
                        <template #icon>
                            <appstore-outlined />
                        </template>
                        Chính sách đổi trả
                    </a-menu-item>
                    <a-menu-item key="store">
                        <template #icon>
                            <heat-map-outlined />
                        </template>
                        Hệ thống cửa hàng
                    </a-menu-item>
                    <a-menu-item key="order">
                        <template #icon>
                            <ordered-list-outlined />
                        </template>
                        Kiểm tra đơn hàng
                    </a-menu-item>
                </a-menu>
            </div>
        </a-row>
        <a-modal v-model:visible="visible" width="600px">
            <template #title>
                <div class="title">
                    Thông tin đơn hàng
                </div>
                <div class="search">
                    <div class="text">Mã đơn hàng</div>
                    <div class="input-search">
                        <a-input v-model:value="searchOrder" placeholder="Nhập mã đơn hàng cần tra cứu" size="large">
                        </a-input>
                        <a-button @click="checkOrder">Tìm kiếm</a-button>
                    </div>
                </div>
            </template>
            <template #footer>
                <a-button key="back" @click="handleCancel">Trở lại</a-button>
                <a-button key="submit" type="primary" @click="handleCancel">Đồng ý</a-button>
            </template>
            <div class="info-order">
                <div v-if="infoOrder">
                    <div v-if="infoOrder.message" style="text-align: center; font-size: 18px; color: red">
                        {{ infoOrder.message }}
                    </div>
                    <div v-else class="info">
                        <div class="title" style="text-align: center">
                            <h2>Thông tin đơn hàng</h2>
                        </div>
                        <p><strong>Mã đơn hàng:</strong> {{ infoOrder.code }}</p>
                        <p><strong>Họ tên:</strong> {{ infoOrder.name }}</p>
                        <p><strong>Số điện thoại:</strong> {{ infoOrder.phone }}</p>
                        <p><strong>Ngày đăt:</strong> {{ formatDate(infoOrder.date) }}</p>
                        <p><strong>Số tiền:</strong> {{ formatVND(infoOrder.money) }} - {{ infoOrder.isPayment }}</p>
                        <p><strong>Tình trạng đơn hàng:</strong> {{ infoOrder.action }}</p>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { MenuFoldOutlined, AppstoreOutlined, HeatMapOutlined, OrderedListOutlined, SettingOutlined, UserOutlined, ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
import moment from "moment";
export default {
    name: "Header",
    components: {
        MenuFoldOutlined,
        AppstoreOutlined,
        HeatMapOutlined,
        OrderedListOutlined,
        SettingOutlined,
        UserOutlined,
        ShoppingCartOutlined,
        LogoutOutlined
    },
    data() {
        return {
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub1'],
            category: {},
            cart: {},
            current: [],
            search: '',
            visible: false,
            searchOrder: '',
            infoOrder: '',
        };
    },
    computed: {
        carts() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.cartData))

            if (shoppingCart) {
                return JSON.parse(JSON.stringify(this.$store.state.product.cartData));
            }
        },
        user() {
            if (this.$store.state.auth.user) {
                return this.$store.state.auth.user
            }
        }

    },
    created() {
        this.getCategory();
        this.test();
        this.getMyInfo();
    },

    methods: {
        async getCategory() {
            let res = await api.getCategory();
            this.category = res;
        },

        async test() {
            let params = {
                product_id: '',
                quantity: ''
            }
            await this.$store.dispatch('product/cartData', params);
        },
        async getMyInfo() {
            let data = await this.$store.dispatch('auth/getMyInfo');
            console.log(data);
            this.$emitter.emit("user_id", data);
        },

        shoppingCart() {
            this.$router.push('/cart/');
        },

        redirectCategory(id) {
            let url = `${process.env.homePage}#/category/` + id;
            window.location.href = url;
            window.location.reload();
        },

        login() {
            this.$router.push({ name: 'Login' });
        },

        toCarts() {
            if (!this.$store.state.auth.user) {
                this.$message.error('Bạn chưa đăng nhập');
                this.$router.push({ name: 'Login' });
            } else {
                this.$router.push({ name: 'Cart' });
            }
        },

        redirectCart() {
            this.$router.push({ name: 'InfoUser' });
        },

        async logout() {
            let res = await api.logout();
            if (res.status === true) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("user_id");
                this.$message.success('Đăng xuất thành công');
                this.$router.push({ name: 'Login' });
            } else {
                this.$message.error('Bạn chưa đăng nhập');
            }
        },

        async onSearch() {
            if (this.search) {
                localStorage.setItem('search', this.search)
                this.$emitter.emit("search", this.search);
                this.$router.push({ name: 'Search' });
            } else {
                return false;
            }
        },

        async checkOrder() {
            let res = await api.checkOrder({ search: this.searchOrder });
            this.infoOrder = res;
        },

        redirectHome() {
            this.$router.push({ name: 'Home' });
        },

        redirectAccount() {
            this.$router.push({ name: 'Account' });
        },

        handleCancel() {
            this.current = ['sub1'],
                this.visible = false;
        },

        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        },

        formatDate(date) {
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('DD/MM/YYYY');
            }
        },
    },
    watch: {
        current: {
            handler(val) {
                if (val[0] === 'order') {
                    this.visible = true;
                }
            },
            deep: true
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/common/header.scss";
</style>
<style lang="scss">
.header-webview {
    .ant-input-wrapper {
        input {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
        }

        input:hover {
            border-color: #fbd947;
        }

        button {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            color: #d82e4d;
            background-color: #fbd947;
            border: none;
        }
    }

    .ant-menu {
        background: none !important;
        border: none !important;
        color: #ffffff !important;
    }

    .ant-menu-light .ant-menu-item:hover {
        color: #fbd947 !important;
    }

    .ant-menu-light .ant-menu-submenu-title:hover {
        color: #fbd947 !important;
    }

    .ant-menu-horizontal>.ant-menu-submenu::after {
        content: none !important;
    }

    .ant-menu-horizontal>.ant-menu-item::after {
        content: none !important;
    }

    .ant-menu-horizontal .ant-menu-submenu {
        background-color: #ffffff;
        color: #d82e4d;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-top: 5px !important;
        font-size: 17px;
        width: 270px;
    }

    .ant-menu-item {
        margin: 5px 0px !important;
        font-size: 17px;
    }

    .ant-menu-submenu {
        .ant-menu-item {
            color: #000000;

            &:hover {
                color: #d82e4d !important;
            }
        }

        .ant-menu-submenu {
            color: #000000;

            &:hover {
                color: #d82e4d !important;
            }
        }
    }
}

.ant-menu-submenu-popup {
    left: 50px !important;
    width: 270px !important;

    .ant-menu-item-only-child {
        &:hover {
            color: #d82e4d !important;
        }
    }

    .ant-menu-title-content {
        &:hover {
            color: #d82e4d !important;
        }
    }
}

.ant-dropdown-menu-title-content {
    .product {
        display: flex !important;

        .detail {
            margin-left: 10px;

            .product-name {
                font-weight: 800;
            }

            .product-price {
                color: #d82e4d;
            }
        }
    }

}

.sum-price {
    font-weight: bold;

    span {
        color: #d82e4d;
    }
}

.pay {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;

    button {
        border-radius: 15px;
        color: #d82e4d;
        border-color: #d82e4d;
        font-weight: bold;

        &:hover {
            color: #ffffff;
            background-color: #d82e4d;
        }
    }
}
</style>