<template>
  <div class="main-login">
      <div class="text">
          Đăng nhập
      </div>
      <div class="form-login">
          <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            @finish="onFinish"
        >
            <a-form-item 
                name="username"
                :rules="[{ required: true, message: 'Bạn chưa nhập vào tài khoản!' }]"
            >
            <a-input
                v-model:value="formState.username"
                placeholder="Tài khoản"
            >
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
            </a-form-item>
            <a-form-item
                name="password"
                :rules="[{ required: true, message: 'Bạn chưa nhập vào mật khẩu!' }]"
            >
            <a-input
                v-model:value="formState.password"
                type="password"
                placeholder="Mật khẩu"
            >
                <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input>
            </a-form-item>
            <a-form-item name="remember" no-style>
                <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>
            <a-form-item>
                <a-button :disabled="!formState.username || !formState.password" type="primary" html-type="submit" class="login-form-button">
                    Đăng nhập
                </a-button><br>
                <a-button class="login-form-button">
                    <!-- <template #prefix> -->
                        <facebook-outlined />
                    <!-- </template> -->
                    Đăng nhập bằng Facebook
                </a-button><br>
                <a class="login-form-forgot" href="">
                    Quên mật khẩu?
                </a><br>
                Hoặc
                <a @click="register">Đăng ký ngay!</a>
            </a-form-item>
        </a-form>
      </div>
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
            }
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
                this.$message.success('Đăng nhập thành công');
                localStorage.setItem('token', res.data);
                await this.$store.dispatch('auth/getMyInfo');
                this.$router.push('/');
            } else {
                this.$message.error(res.message);
            }
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