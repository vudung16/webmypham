<template>
    <div>
        <div class="account">
            <div class="tittle">
                <h2>Thông tin tài khoản</h2>
            </div>
            <div class="form-account">
                <form>
                    <a-row :gutter="50">
                        <a-col :span="16">
                            <div class="name">
                                <div class="title">Họ tên</div>
                                <a-form-item>
                                    <a-input v-model:value="account.name"/>
                                    <span v-if="errors.name" style="color:red; font-size: 13px">{{ errors.name[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Số điện thoại</div>
                                <a-form-item>
                                    <a-input-number v-model:value="account.phone"/>
                                    <span v-if="errors.phone" style="color:red; font-size: 13px">{{ errors.phone[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Email</div>
                                <a-form-item>
                                    <a-input type="email" v-model:value="account.email"/>
                                    <span v-if="errors.email" style="color:red; font-size: 13px">{{ errors.email[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Mật khẩu mới</div>
                                <a-form-item>
                                    <a-input type="password" v-model:value="password"/>
                                    <span v-if="errors.password" style="color:red; font-size: 13px">{{ errors.password[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="title">Nhập lại mật khẩu mới</div>
                                <a-form-item>
                                    <a-input type="password" v-model:value="retype"/>
                                    <span v-if="errors.retype" style="color:red; font-size: 13px">{{ errors.retype[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                        </a-col>
                        <a-col :span="8">
                            <div class="upload">
                                <div class="image">
                                    <a-upload
                                        v-model:file-list="fileList"
                                        name="avatar"
                                        list-type="picture-card"
                                        class="avatar-uploader"
                                        :show-upload-list="false"
                                        :before-upload="() => false"
                                        @change="handleChange"
                                    >
                                        <img style="width:100px; height: 100px" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                                        <div v-else>
                                            <plus-outlined />
                                            <div class="ant-upload-text">Upload</div>
                                        </div>
                                    </a-upload>
                                </div>
                                <div style="text-align:center">Ảnh đại diện</div>
                            </div>
                        </a-col>
                    </a-row>
                    <div class="btn"><a-button @click="updateUser">Thay đổi</a-button></div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
import {PlusOutlined} from "@ant-design/icons-vue";
import api from '../../../api/homewebview';
export default {
    name: 'Account',
    components: {PlusOutlined},
    data() {
        return {
            fileList: [],
            imageUrl: '',
            account: '',
            errors: [],
            password: '',
            retype: '',
        }
    },
    computed: {
        getAccount() {
            if (this.$store.state.auth.user) {
                this.account = this.$store.state.auth.user
                this.imageUrl = this.$store.state.auth.user.image
                return this.$store.state.auth.user
            }
        }
    },
    methods: {
        handleChange(info) {
            if (info.file) {
                // Get this url from response in real world.
                getBase64(info.fileList[0].originFileObj, base64Url => {
                    this.imageUrl = base64Url;
                });
            }
        },
        async updateUser() {
            let params = {
                id: this.account.id,
                name: this.account.name,
                phone: this.account.phone,
                email: this.account.email,
                password: this.password,
                retype: this.retype
            }
            const formData = new FormData();
            for (let i = 0; i < Object.values(params).length; i++) {
                formData.append(Object.keys(params)[i], Object.values(params)[i]);
            }
            if (this.fileList) {
                formData.append('image', this.fileList[0].originFileObj);
            }
            await api.updateUser(formData)
            .then((res) => {
                if (res.status === false) {
                    this.errors = res.errors;
                } else {
                    this.$message.success("Cập nhật tài khoản thành công");
                }
            })
            .catch(error => {
                this.$message.error("Có lỗi xảy ra");
            })
        }
    }
}
</script>
<style lang="scss">
.account {
    max-width: 1000px;
    margin: 0 auto;
    padding: 50px 0px;
    .tittle {
        text-align: center;
    }
    .upload {
        .image {
            padding: 50px 100px 0px 95px;
        }
    }
    .btn {
        text-align: center;
        button {
            background-color: #d82e4d;
            color: #ffffff;
            font-size: 18px;
            line-height: 22px;
        }
    }
    .ant-input-number {
        width: 100%;
    }
}
</style>