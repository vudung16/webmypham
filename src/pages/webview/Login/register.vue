<template>
  <div class="main-login">
      <div class="text">
          Đăng Ký
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
                :rules="[{ required: true, message: 'Bạn chưa nhập vào họ tên!' }]"
            >
                <a-input
                    v-model:value="formState.username"
                    placeholder="Họ tên"
                >
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item 
                name="email"
                :rules="[{ required: true, message: 'Bạn chưa nhập vào email!' }]"
            >
                <a-input
                    v-model:value="formState.email"
                    placeholder="Email"
                    type="email"
                >
                    <template #prefix>
                        <mail-outlined />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item 
                name="phone"
                :rules="[{ required: true, message: 'Bạn chưa nhập vào số điện thoại!' }]"
            >
                <a-input
                    v-model:value="formState.phone"
                    placeholder="Số điện thoại"
                >
                    <template #prefix>
                        <phone-outlined />
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
            <a-form-item
                name="retypePassword"
                :rules="[{ required: true, message: 'Bạn chưa nhập lại mật khẩu!' }]"
            >
                <a-input
                    v-model:value="formState.retypePassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                >
                    <template #prefix>
                        <unlock-outlined />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button :disabled="!formState.username || !formState.password || !formState.email || !formState.retypePassword" type="primary" html-type="submit" class="login-form-button">
                    Đăng Ký
                </a-button><br>
            </a-form-item>
        </a-form>
      </div>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined, FacebookOutlined, MailOutlined, UnlockOutlined, PhoneOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
export default {
    components: {
        UserOutlined,
        LockOutlined,
        FacebookOutlined,
        MailOutlined,
        UnlockOutlined,
        PhoneOutlined
    },
    data() {
        return {
            formState: {
                // form: '',
                username: '',
                password: '',
                email: '',
                retypePassword: '',
                phone: '',
                image: '',
            }
        }
     },

    methods: {
        async onFinish(values) {
            let params = {
                name: values.username,
                email: values.email,
                password: values.password,
                retype_password: values.retypePassword,
                phone: values.phone
            }
            let res = await api.register(params);
            if (res.status === true) {
                this.$message.success('Đăng ký thành công');
                this.$router.push({name: 'Login'});
            } else {
                this.$message.error(res.message);
            }
        },
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