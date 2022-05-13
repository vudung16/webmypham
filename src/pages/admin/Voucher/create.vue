<template>
    <div class="voucher-create">
        <div class="header">
            <Breadcrums :title="this.type === 'edit' ? 'Chỉnh sửa Voucher' : 'Thêm mới Voucher'">
                <template #action>
                    <a-button size="large" style="margin-right: 15px;" @click="cancel">Hủy bỏ</a-button>
                    <a-button size="large" type="primary">{{ this.type === 'edit' ? 'Cập Nhật' : 'Thêm mới' }}
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
                                </a-form-item>
                            </div>
                            <div class="name">
                                <div class="txt-name">
                                    <label for="name"> Tên voucher<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="name" name="name">
                                    <a-input v-model:value="formState.name" />
                                </a-form-item>
                            </div>
                            <div class="description">
                                <div class="txt-description">
                                    <label for="description"> Mô tả ngắn<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="description" name="description">
                                    <ckeditor :editor="editor" v-model:value="formState.description"
                                        :config="editorConfig">
                                    </ckeditor>
                                </a-form-item>
                            </div>
                            <div class="image">
                                <div class="txt-image">
                                    <label for="image"> Hình ảnh<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="image" name="image">
                                    <a-input type="file" v-model:value="formState.image" />
                                </a-form-item>
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
                                </a-form-item>
                            </div>
                            <div class="user">
                                <div class="txt-user">
                                    <label for="user"> Số lượng tối đa người dùng có thể áp dụng<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="user" name="user">
                                    <a-input-number v-model:value="formState.user" />
                                </a-form-item>
                            </div>
                            <div class="order">
                                <div class="txt-order">
                                    <label for="order"> Giá trị đơn hàng tối thiểu<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="order" name="order">
                                    <a-input-number v-model:value="formState.order" />
                                </a-form-item>
                            </div>
                            <div class="discount">
                                <div class="txt-discount">
                                    <label for="discount"> Số tiền tối đa áp dụng<span
                                            style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="discount" name="discount">
                                    <a-input-number v-model:value="formState.discount" />
                                </a-form-item>
                            </div>
                            <div class="precent">
                                <div class="txt-precent">
                                    <label for="precent"> Phần trăm áp dụng<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="precent" name="precent">
                                    <a-input-number v-model:value="formState.precent" />
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
                            </div>
                            <div :style="{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }">
                                <div class="end">
                                    <label for="end"> Ngày kết thúc<span style="color:red">*</span></label>
                                </div>
                                <a-calendar v-model:value="formState.end" :fullscreen="false" @panelChange="onEnDate" />
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
export default {
    name: "VoucherCreate",
    props: ['type'],
    data() {
        return {
            formState: {
                code: '',
                name: '',
                description: '',
                image: '',
                uses: '',
                user: '',
                order: '',
                discount: '',
                precent: '',
                start: '',
                end: ''
            },
            editorConfig: editorConfig,
            editor: ClassicEditor,
        }
    },
    methods: {
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