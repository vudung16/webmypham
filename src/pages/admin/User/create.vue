<template>
    <div class="user-create">
        <div class="header">
            <Breadcrums :title="'Thêm mới tài khoản'">
                <template #action>
                    <a-button size="large" style="margin-right: 15px;" @click="cancel">Hủy bỏ</a-button>
                    <a-button size="large" type="primary" @click="createUser">Thêm mới</a-button>
                </template>
            </Breadcrums>
        </div>
        <div class="create">
            <a-form ref="formRef" :model="formState">
                <a-row :gutter="24">
                    <a-col :span="16">
                        <div class="main">
                            <h3>Thông tin tạo mới</h3>
                            <div class="name">
                                <div class="txt-name">
                                    <label for="name"> Họ tên<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="name" name="name">
                                    <a-input v-model:value="formState.name" />
                                    <span v-if="errors.name" style="color:red; font-size: 13px">{{ errors.name[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            
                            <div class="email">
                                <div class="txt-email">
                                    <label for="email"> Email<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="email" name="email">
                                    <a-input v-model:value="formState.email" />
                                    <span v-if="errors.email" style="color:red; font-size: 13px">{{ errors.email[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="password">
                                <div class="txt-password">
                                    <label for="password"> Password<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="password" name="password">
                                    <a-input style="width:76%" v-model:value="formState.password" />
                                    <a-button type="primary" style="width:24%" @click="createPassword">Tạo mật khẩu</a-button>
                                    <span v-if="errors.password" style="color:red; font-size: 13px">{{ errors.password[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div class="main">
                            <h3>Phân quyền</h3>
                            <a-checkbox :value="1" @change="updatePermissionUser">Đơn hàng</a-checkbox><br>
                            <a-checkbox :value="2" @change="updatePermissionUser">Slide</a-checkbox><br>
                            <a-checkbox :value="4" @change="updatePermissionUser">Sản phẩm</a-checkbox><br>
                            <a-checkbox :value="8" @change="updatePermissionUser">Voucher</a-checkbox><br>
                            <a-checkbox :value="16" @change="updatePermissionUser">Tài khoản</a-checkbox><br>
                            <a-checkbox :value="32" @change="updatePermissionUser">Thương hiệu</a-checkbox><br>
                            <a-checkbox :value="64" @change="updatePermissionUser">Danh mục</a-checkbox><br>
                            <a-checkbox :value="128" @change="updatePermissionUser">Nhập kho</a-checkbox><br>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>
<script>
import api from '../../../api/admin';
export default {
    name: "CreateUser",
    data() {
        return {
            formState: {
                email: '',
                name: '',
                password: '',
                role: 0,
            },
            errors: [],
        }
    },
    methods: {
        updatePermissionUser(e) {
            if (e.target.checked === true) {
                this.formState.role += e.target.value
            } else {
                this.formState.role -= e.target.value 
            }
        },
        createPassword() {
            this.formState.password = Math.random().toString(36).substr(2, 8);
        },

        async createUser() {
            await api.createUser(this.formState).then(() => {
                this.$message.success('Thêm tài khoản thành công');
                this.$router.push({ name: 'User' });
            }).catch((error) => this.$message.error('Có lỗi xảy ra'))
        },
        cancel() {
            this.$router.push({ name: 'User' });
        }
    }
}
</script>
<style lang="scss">
.user-create {
    .create {
        max-width: 800px;
        margin: 0 auto;
        margin-top: 20px !important;
        margin-bottom: 20px !important;

        .main {
            background: #ffffff;
            padding: 20px 20px;
            border-radius: 10px;
            height: 100%;

            .ant-input-number {
                width: 100%
            }
        }
    }
}
</style>