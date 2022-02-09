<template>
    <div class="header-webview">
        <a-row class="header" align="middle">
            <a-col class="header-left" :span="6">
                <div>
                    <img width="240" height="50" src="https://theme.hstatic.net/200000411391/1000799987/14/logo.png?v=209" alt="">
                </div>
            </a-col>
            <a-col class="header-center" :span="7">
                <div>
                    <a-input-search
                        v-model:value="value"
                        placeholder="Tìm kiếm..."
                        enter-button
                        @search="onSearch"
                    />
                </div>
            </a-col>
            <a-col class="header-right" :span="11">
                <div class="header-right-menu">
                    <div class="customer">
                        <img width="32" height="32" src="https://theme.hstatic.net/200000411391/1000799987/14/phone-icon.png?v=209" alt="">
                        <div class="menu-content">
                            <div>Hỗ Trợ khách hàng</div>
                            <div>0386132297</div>
                        </div>
                    </div>
                    <div class="login">
                        <img width="32" height="32" src="https://theme.hstatic.net/200000411391/1000799987/14/account-icon.png?v=209" alt="">
                        <div class="menu-content">
                            <div>Tài khoản</div>
                            <div>Đăng nhập</div>
                        </div>
                    </div>
                    <div class="cart">
                        <a-dropdown>
                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                <a-menu-item key="1">
                                    1st menu item
                                </a-menu-item>
                                <a-menu-item key="2">
                                    2nd menu item
                                </a-menu-item>
                                <a-menu-item key="3">
                                    3rd item
                                </a-menu-item>
                                </a-menu>
                            </template>
                            <a-button>
                                <img width="24" height="24" src="https://theme.hstatic.net/200000411391/1000799987/14/cart-icon.png?v=209" alt="">
                                <span>Giỏ hàng &nbsp;</span>
                                <span class="quantity">0</span> 
                            </a-button>
                        </a-dropdown>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row class="header-bottom">
            <div class="header-bottom-menu">
                <a-menu v-model="current" mode="horizontal">
                    <a-sub-menu key="sub1" :disabled="hideMenu">
                        <template #icon>
                            <AppstoreOutlined />
                        </template>
                        <template #title>Danh mục sản phẩm</template>
                        <a-menu-item key="3">Option 3</a-menu-item>
                        <a-menu-item key="4">Option 4</a-menu-item>
                        <a-sub-menu key="sub1-2" title="Submenu">
                            <a-menu-item key="5">Option 5</a-menu-item>
                            <a-menu-item key="6">Option 6</a-menu-item>
                        </a-sub-menu>
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
    </div>
</template>

<script>
import { MenuFoldOutlined, AppstoreOutlined, HeatMapOutlined, OrderedListOutlined, SettingOutlined} from '@ant-design/icons-vue';
    export default {
        name: "Header",
        components: {
            MenuFoldOutlined,
            AppstoreOutlined,
            HeatMapOutlined,
            OrderedListOutlined,
            SettingOutlined
        },
        data() {
            return {
                rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
                openKeys: ['sub1'],
                hideMenu: false,
            };
        },
        computed: {
            hideMenu() {
                // you can  check your form is filled or not here.
                if (this.$route.name == 'Home') {
                return this.hideMenu == true;
            }
            },
        },
        created() {
            if (this.$route.name == 'Home') {
                this.hideMenu == true;
            }
        }
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
.ant-menu-horizontal > .ant-menu-submenu::after {
    content: none !important;
}
.ant-menu-horizontal > .ant-menu-item::after {
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
</style>