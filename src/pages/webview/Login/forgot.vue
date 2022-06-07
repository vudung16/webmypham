<template>
    <div class="main-login">
        <div class="text">
            Thay đổi mật khẩu
        </div>
        <div class="form-login">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish">
                <a-form-item name="password" :rules="[{ required: true, message: 'Bạn chưa nhập vào mật khẩu!' }]">
                    <a-input v-model:value="formState.password" type="password" placeholder="Mật khẩu">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item name="retype" :rules="[{ required: true, message: 'Bạn chưa nhập vào mật khẩu!' }]">
                    <a-input v-model:value="formState.retype" type="password" placeholder="Nhập lại mật khẩu">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button :disabled="!formState.retype || !formState.password" type="primary" html-type="submit"
                        class="login-form-button">
                        Đồng ý
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
import { LockOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
export default {
    components: {
        LockOutlined,
    },
    data() {
        return {
            formState: {
                password: '',
                retype: '',
            },
        }
    },

    methods: {
        async onFinish(values) {
            let params = {
                token: this.$route.query.token,
                password: this.formState.password,
                retype: this.formState.retype
            }
            await api.reset(params).then((res) => {
                if (res.status === true) {
                    this.$message.success('Thay đổi mật khẩu thành công');
                    this.$router.push({ name: 'Login' });
                } else {
                    this.$message.error(res.message);
                }
            }).catch((error) => { this.$message.error('Có lỗi xảy ra') });
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