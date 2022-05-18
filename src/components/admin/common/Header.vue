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
                    <a-avatar :src="user.image" />
                    <a-dropdown :trigger="['click']">
                        <a class="ant-dropdown-link">
                            {{ user.name }}
                        </a>
                        <template #overlay>
                            <a-menu key="info" @click="handleMenuClick">
                            <a-menu-item>
                                <UserOutlined />
                                Thông tin tài khoản
                            </a-menu-item>
                            <a-menu-item key="logout">
                                <UserOutlined />
                                Thoát
                            </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import {UserOutlined} from '@ant-design/icons-vue';
import api from '../../../api/homewebview';
    export default {
        name: "Header",
        components: {UserOutlined},
        data () {
            return {
                user: '',
            }
        },
        created() {
            this.getUser();
        },
        methods: {
            getUser() {
                let user = this.$store.state.auth.user;
                if (user) {
                    this.user = user;
                }
            },
            async handleMenuClick(e) {
                if (e.key === 'logout') {
                    let res = await api.logout();
                    if (res.status === true) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        localStorage.removeItem("user_id");
                        this.$message.success('Đăng xuất thành công');
                        this.$router.push({ name: 'Login' });
                        this.$store.state.auth.user = "";
                        this.$store.state.auth.myId = "";
                    } else {
                        this.$message.error('Bạn chưa đăng nhập');
                    }
                } 
            },
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
    .ant-avatar {
        margin-right: 10px;
    }
}
</style>