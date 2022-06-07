<template>
    <div class="main-login">
        <div class="text">
            Đăng nhập
        </div>
        <div class="form-login">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish">
                <a-form-item name="username" :rules="[{ required: true, message: 'Bạn chưa nhập vào tài khoản!' }]">
                    <a-input v-model:value="formState.username" placeholder="Tài khoản">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="password" :rules="[{ required: true, message: 'Bạn chưa nhập vào mật khẩu!' }]">
                    <a-input v-model:value="formState.password" type="password" placeholder="Mật khẩu">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="!formState.username || !formState.password" type="primary" html-type="submit"
                        class="login-form-button">
                        Đăng nhập
                    </a-button><br>
                    <a-button @click="loginFacebook" class="login-form-button">
                        <!-- <template #prefix> -->
                        <facebook-outlined />
                        <!-- </template> -->
                        Đăng nhập bằng Facebook
                    </a-button><br>
                    <a class="login-form-forgot" @click="openForgot">
                        Quên mật khẩu?
                    </a><br>
                    Hoặc
                    <a @click="register">Đăng ký ngay!</a>
                </a-form-item>
            </a-form>
        </div>
        <a-modal v-model:visible="visible" title="Quên mật khẩu" @ok="handleOk">
            <template #footer>
                <a-button key="back" @click="handleCancel">Hủy bỏ</a-button>
                <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Đồng ý</a-button>
            </template>
            <a-input type="email" v-model:value="email" placeholder="Nhập vào email" />
        </a-modal>
    </div>
</template>
<script>
import { UserOutlined, LockOutlined, FacebookOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
export default {
    components: {
        UserOutlined,
        LockOutlined,
        FacebookOutlined
    },
    data() {
        return {
            formState: {
                // form: '',
                username: '',
                password: '',
                remember: true,
            },
            visible: false,
            email: '',
            loading: false,
        }
    },

    methods: {
        async onFinish(values) {
            let params = {
                email: values.username,
                password: values.password,
                remember: values.remember
            }
            let res = await api.login(params);
            if (res.status === true) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('user_id', res.data.user_id);
                await this.$store.dispatch('auth/getMyInfo');
                if (res.data.role === 1) {
                    this.$message.success('Đăng nhập thành công');
                    let params = {
                        product_id: '',
                        quantity: ''
                    }
                    await this.$store.dispatch('product/cartData', params);
                    this.$router.push('/');
                } else {
                    if (res.data.role === 2) {
                        this.$message.success('Đăng nhập thành công');
                        this.$router.push({ name: 'Dashboard' });
                    } else {
                        this.$message.error('Đăng nhập thất bại');
                    }
                }
            } else {
                this.$message.error(res.message);
            }
        },
        openForgot() {
            this.visible = true;
        },

        async loginFacebook() {
            let res = await api.loginFacebook();
            if (res.status === true) {
                window.location.href = res.data
            } else {
                this.$message.error('Đăng nhập thất bại');
            }
        },

        async handleOk() {
            if (this.email === '') {
                this.$message.error('Vui lòng nhập vào email');
                return false;
            }
            this.loading = true;
            await api.forgot({ email: this.email })
                .then((res) => {
                    if (res.status === true) {
                        this.$message.success('Vui lòng kiểm tra mail để lấy lại mật khẩu');
                        this.visible = false;
                    } else {
                        this.$message.error(res.message);
                    }
                })
                .catch((error) => { this.$message.error('Có lỗi xảy ra') });
            this.loading = false;
        },

        handleCancel() {
            this.visible = false;
        },

        register() {
            this.$router.push('/register');
        }
    },

}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/webview/login.scss";
</style>
<style lang="scss">
.main-login {
    .form-login {
        .ant-form-item-control-input-content {
            text-align: center !important;
        }
    }
}
</style>