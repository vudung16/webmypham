<template>
    <div class="admin-header">
        <div class="collapsed-button">
            <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
                <MenuUnfoldOutlined v-if="collapsed"/>
                <MenuFoldOutlined v-else />
            </a-button>
        </div>
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
    </div>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons-vue';
    export default {
        name: "Header",
        components: {
            MenuFoldOutlined, 
            MenuUnfoldOutlined,
            UserOutlined
        },

        data() {
            return {
                collapsed: false,
            };
        },

        methods: {
            toggleCollapsed() {
                this.collapsed = !this.collapsed;
                this.$emitter.emit("toggle-sidebar", this.collapsed);
            }
        }
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