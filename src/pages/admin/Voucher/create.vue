<template>
    <div class="voucher-create">
        <div class="header">
            <Breadcrums :title="this.type === 'edit' ? 'Chỉnh sửa Voucher' : 'Thêm mới Voucher'">
                <template #action>
                    <a-button size="large" style="margin-right: 15px;" @click="cancel">Hủy bỏ</a-button>
                    <a-button size="large" type="primary" @click="createUpdate">{{ this.type === 'edit' ? 'Cập Nhật' :
                            'Thêm mới'
                    }}
                    </a-button>
                </template>
            </Breadcrums>
        </div>
        <div class="create">
            <a-form ref="formRef" :model="formState">
                <a-row :gutter="24">
                    <a-col :span="10">
                        <div class="main">
                            <div class="code">
                                <div class="txt-code">
                                    <label for="code"> Mã Voucher<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="code" name="code">
                                    <a-input v-model:value="formState.code" />
                                    <span v-if="errors.code" style="color:red; font-size: 13px">{{ errors.code[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="txt-name">
                                    <label for="name"> Tên voucher<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="name" name="name">
                                    <a-input v-model:value="formState.name" />
                                    <span v-if="errors.name" style="color:red; font-size: 13px">{{ errors.name[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="description">
                                <div class="txt-description">
                                    <label for="description"> Mô tả ngắn<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="description" name="description">
                                    <ckeditor :editor="editor" v-model="formState.description" :config="editorConfig">
                                    </ckeditor>
                                    <span v-if="errors.description" style="color:red; font-size: 13px">{{
                                            errors.description[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="image">
                                <div class="txt-image">
                                    <label for="image"> Hình ảnh<span v-if="this.type !== 'edit'"
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="image" name="image">
                                    <a-input type="file" @change="onFileChange" />
                                    <span v-if="errors.image" style="color:red; font-size: 13px">{{ errors.image[0]
                                    }}</span>
                                </a-form-item>
                                <div v-if="showImage" class="show-image">
                                    <img style="width: 100%; height: 100px;" :src="showImage" alt="">
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div class="main">
                            <div class="uses">
                                <div class="txt-uses">
                                    <label for="uses"> Số lượng phát ra<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="uses" name="uses">
                                    <a-input-number v-model:value="formState.uses" />
                                    <span v-if="errors.uses" style="color:red; font-size: 13px">{{ errors.uses[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="user">
                                <div class="txt-user">
                                    <label for="user"> Số lượng tối đa người dùng có thể áp dụng<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="user" name="user">
                                    <a-input-number v-model:value="formState.user" />
                                    <span v-if="errors.user" style="color:red; font-size: 13px">{{ errors.user[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="order">
                                <div class="txt-order">
                                    <label for="order"> Giá trị đơn hàng tối thiểu<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="order" name="order">
                                    <a-input-number v-model:value="formState.order" />
                                    <span v-if="errors.order" style="color:red; font-size: 13px">{{ errors.order[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="discount">
                                <div class="txt-discount">
                                    <label for="discount"> Số tiền tối đa áp dụng<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="discount" name="discount">
                                    <a-input-number v-model:value="formState.discount" />
                                    <span v-if="errors.discount" style="color:red; font-size: 13px">{{
                                            errors.discount[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="precent">
                                <div class="txt-precent">
                                    <label for="precent"> Phần trăm áp dụng<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="precent" name="precent">
                                    <a-input-number v-model:value="formState.precent" />
                                    <span v-if="errors.precent" style="color:red; font-size: 13px">{{ errors.precent[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div class="main">
                            <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                                <div class="start">
                                    <label for="start"> Ngày bắt đầu<span style="color:red">*</span></label>
                                </div>
                                <a-calendar v-model:value="formState.start" :fullscreen="false"
                                    @panelChange="onStartDate" />
                                <span v-if="errors.start" style="color:red; font-size: 13px">{{ errors.start[0]
                                }}</span>
                            </div>
                            <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                                <div class="end">
                                    <label for="end"> Ngày kết thúc<span style="color:red">*</span></label>
                                </div>
                                <a-calendar v-model:value="formState.end" :fullscreen="false" @panelChange="onEnDate" />
                                <span v-if="errors.end" style="color:red; font-size: 13px">{{ errors.end[0]
                                }}</span>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>
<script>
import editorConfig from "../../../configs/ckeditor";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import api from '../../../api/admin';
export default {
    name: "VoucherCreate",
    props: ['type'],
    data() {
        return {
            formState: {
                code: '',
                name: '',
                description: '',
                uses: '',
                user: '',
                order: '',
                discount: '',
                precent: '',
                start: '',
                end: ''
            },
            showImage: '',
            image: '',
            errors: [],
            editorConfig: editorConfig,
            editor: ClassicEditor,
        }
    },
    mounted() {
        if (this.type === 'edit') {
            this.getDataUpdate();
        }
    },
    methods: {
        createUpdate() {
            const formData = new FormData();
            for (let i = 0; i < Object.values(this.formState).length; i++) {
                formData.append(Object.keys(this.formState)[i], Object.values(this.formState)[i]);
            }
            if (this.type === 'edit') {
                formData.append('id', this.$route.query.id);
                if (this.image !== '') {
                    formData.append('image', this.image);
                }
                api.updateVoucher(formData)
                    .then((res) => {
                        if (res.status === false) {
                            this.errors = res.errors;
                        } else {
                            this.$message.success("Chỉnh sửa voucher thành công");
                            this.$router.push({ name: 'Voucher' });
                        }
                    })
                    .catch(error => {
                        this.$message.error("Có lỗi xảy ra");
                    })
            } else {
                formData.append('image', this.image);
                api.createVoucher(formData)
                    .then((res) => {
                        if (res.status === false) {
                            this.errors = res.errors;
                        } else {
                            this.$message.success("Tạo mới voucher thành công");
                            this.$router.push({ name: 'Voucher' });
                        }
                    })
                    .catch(error => {
                        this.$message.error("Có lỗi xảy ra");
                    })
            }
        },
        getDataUpdate() {
            api.detailVoucher({ id: this.$route.query.id })
                .then((res) => {
                    this.formState = res.info;
                    this.showImage = res.image;
                }).catch(error => {
                    this.$message.error('Có lỗi xảy ra');
                    console.log('error');
                });
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.image = files[0];
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.showImage = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        onStartDate(value, mode) {
            console.log(value);
        },
        onEnDate(value, mode) {
            console.log(value);
        },
        cancel() {
            this.$router.push({ name: 'Voucher' });
        }
    }
}
</script>
<style lang="scss">
.voucher-create {
    .create {
        max-width: 1100px;
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