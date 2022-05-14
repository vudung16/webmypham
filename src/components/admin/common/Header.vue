<template>
    <div class="admin-header">
        <a-row :gutter="24" style="width:100%">
            <a-col :span="8">
            </a-col>
            <a-col :span="8" style="text-align:center">
                <div class="logo-image">
                    <img src="../../../assets/images/logo.png" alt="">
                </div>
            </a-col>
            <a-col :span="8">
                <div class="info-name">
                    <a-dropdown-button>
                    <template #icon><UserOutlined /></template>
                    Mạnh Dũng
                    <template #overlay>
                        <a-menu>
                        <a-menu-item key="1">
                            <UserOutlined />
                            Thông tin tài khoản
                        </a-menu-item>
                        <a-menu-item key="2">
                            <UserOutlined />
                            Thoát
                        </a-menu-item>
                        </a-menu>
                    </template>
                    </a-dropdown-button>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import {UserOutlined } from '@ant-design/icons-vue';
    export default {
        name: "Header",
        components: {
            UserOutlined
        },
    }
</script>

<style lang="scss">
.admin-header {
    display: flex;
    padding: 10px 0px 10px 10px;
    background: #fafafa;
    height: 52px;
    .collapsed-button {
        flex-grow: 2;
    }
    .info-name {
        flex-grow: 8;
        text-align: right;
        padding: 0px 30px;
    }
}
</style>