<template>
    <div class="product-create">
        <div class="header">
            <Breadcrums :title="this.type === 'edit' ? 'Chỉnh sửa Sản phẩm' : 'Thêm mới Sản phẩm'">
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
                    <a-col :span="16">
                        <div class="main">
                            <div class="name">
                                <div class="txt-name">
                                    <label for="name"> Tên Sản phẩm<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="name" name="name">
                                    <a-input v-model:value="formState.name" />
                                    <span v-if="errors.name" style="color:red; font-size: 13px">{{ errors.name[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="description">
                                <div class="txt-description">
                                    <label for="description"> Mô tả<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="description" description="description">
                                    <a-textarea v-model:value="formState.description" placeholder="Nhập mô tả ngắn"
                                        :rows="4" />
                                    <span v-if="errors.description" style="color:red; font-size: 13px">{{
                                            errors.description[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="content">
                                <div class="txt-content">
                                    <label for="content"> Mô tả chi tiết<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="content" name="content">
                                    <ckeditor :editor="editor" v-model="formState.content" :config="editorConfig">
                                    </ckeditor>
                                    <span v-if="errors.content" style="color:red; font-size: 13px">{{
                                            errors.content[0]
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
                            <div class="media">
                                <div class="txt-media">
                                    <label for="media"> Media</label>
                                </div>
                                <a-form-item ref="media" name="media">
                                    <a-upload list-type="picture-card" v-model:file-list="fileList"
                                        @preview="handlePreview" @change="handleChange" :before-upload="() => false">
                                        <div v-if="fileList.length < 8">
                                            <plus-outlined />
                                            <div class="ant-upload-text">
                                                Upload
                                            </div>
                                        </div>
                                    </a-upload>
                                    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                        <img alt="example" style="width: 100%" :src="previewImage" />
                                    </a-modal>
                                </a-form-item>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="8">
                        <div class="main">
                            <div class="title">
                                <h3>Quản lý</h3>
                            </div>
                            <div class="category">
                                <div class="txt-category">
                                    <label for="category"> DANH MỤC<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="category" name="category">
                                    <a-select placeholder="Chọn danh mục" :allowClear="true" class="full-width"
                                        v-model:value="formState.category">
                                        <a-select-option v-for="category in category" :value="category.category_id"
                                            :key="category.category_id">
                                            {{ category.category_name }}
                                        </a-select-option>
                                    </a-select>
                                    <span v-if="errors.brand" style="color:red; font-size: 13px">{{ errors.brand[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="brand">
                                <div class="txt-brand">
                                    <label for="brand"> THƯƠNG HIỆU<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="brand" name="brand">
                                    <a-select placeholder="Chọn thương hiệu" :allowClear="true" class="full-width"
                                        v-model:value="formState.brand">
                                        <a-select-option v-for="brand in brand" :value="brand.brand_id"
                                            :key="brand.brand_id">
                                            {{ brand.brand_name }}
                                        </a-select-option>
                                    </a-select>
                                    <span v-if="errors.brand" style="color:red; font-size: 13px">{{ errors.brand[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="price">
                                <div class="txt-price">
                                    <label for="price"> Giá bán<span style="color:red">*</span></label>
                                </div>
                                <a-form-item ref="price" name="price">
                                    <a-input-number v-model:value="formState.price" />
                                    <span v-if="errors.price" style="color:red; font-size: 13px">{{ errors.price[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="discount">
                                <div class="txt-discount">
                                    <label for="discount"> Giảm giá(%)</label>
                                </div>
                                <a-form-item ref="discount" name="discount">
                                    <a-input-number v-model:value="formState.discount" />
                                    <span v-if="errors.discount" style="color:red; font-size: 13px">{{
                                            errors.discount[0]
                                    }}</span>
                                </a-form-item>
                            </div>
                            <div class="size">
                                <div class="txt-size">
                                    <label for="size"> Kích thước (cm, kg)<span style="color:red">*</span></label>
                                </div>
                                <a-row :gutter="10">
                                    <a-col :span="6">
                                        <a-input-number :placeholder="'Dài'" v-model:value="formState.length" />
                                    </a-col>
                                    <a-col :span="6">
                                        <a-input-number :placeholder="'Rộng'" v-model:value="formState.width" />
                                    </a-col>
                                    <a-col :span="6">
                                        <a-input-number :placeholder="'Cao'" v-model:value="formState.height" />
                                    </a-col>
                                    <a-col :span="6">
                                        <a-input-number :placeholder="'KL'" v-model:value="formState.weight" />
                                    </a-col>
                                </a-row>
                                <div class="error-size">
                                    <span v-if="errors.length" style="color:red; font-size: 13px">{{
                                            errors.length[0]
                                    }}</span><br>
                                    <span v-if="errors.width" style="color:red; font-size: 13px">{{
                                            errors.width[0]
                                    }}</span><br>
                                    <span v-if="errors.height" style="color:red; font-size: 13px">{{
                                            errors.height[0]
                                    }}</span><br>
                                    <span v-if="errors.weight" style="color:red; font-size: 13px">{{
                                            errors.weight[0]
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </div>
</template>
<script>
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}
import { PlusOutlined } from '@ant-design/icons-vue';
import editorConfig from "../../../configs/ckeditor";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import api from '../../../api/admin';
import apiwebview from '../../../api/homewebview';
export default {
    name: "ProductCreate",
    props: ['type'],
    components: { PlusOutlined },
    data() {
        return {
            formState: {
                name: '',
                description: '',
                content: '',
                brand: '',
                category: '',
                price: '',
                discount: '',
                width: '',
                height: '',
                length: '',
                weight: '',
            },
            image: '',
            fileList: [],
            showImage: '',
            brand: {},
            category: {},
            errors: [],
            previewVisible: false,
            previewImage: '',
            editorConfig: editorConfig,
            editor: ClassicEditor,
        }
    },
    mounted() {
        if (this.type === 'edit') {
            this.getDataUpdate();
        }
        this.getBrand();
        this.getCategory();
    },
    methods: {
        createUpdate() {
            const formData = new FormData();
            for (let i = 0; i < Object.values(this.formState).length; i++) {
                if (Object.keys(this.formState)[i] == 'image' || Object.keys(this.formState)[i] == 'fileList') {
                    continue;
                }
                formData.append(Object.keys(this.formState)[i], Object.values(this.formState)[i]);
            }
            for (let i = 0; i < this.fileList.length; i++) {
                formData.append('fileList[]', this.fileList[i].originFileObj);
            }
            if (this.type === 'edit') {
                formData.append('id', this.$route.query.id);
                if ((typeof this.image) == 'object') {
                    formData.append('image', this.image);
                }
                api.updateProduct(formData)
                    .then((res) => {
                        if (res.status === false) {
                            this.errors = res.errors;
                        } else {
                            this.$message.success("Chỉnh sửa sản phẩm thành công");
                            this.$router.push({ name: 'Product' });
                        }
                    })
                    .catch(error => {
                        this.$message.error("Có lỗi xảy ra");
                    })
            } else {
                formData.append('image', this.image);
                api.createProduct(formData)
                    .then((res) => {
                        if (res.status === false) {
                            this.errors = res.errors;
                        } else {
                            this.$message.success("Tạo mới sản phẩm thành công");
                            this.$router.push({ name: 'Product' });
                        }
                    })
                    .catch(error => {
                        this.$message.error("Có lỗi xảy ra");
                    })
            }
        },
        getDataUpdate() {
            api.detailProduct({ id: this.$route.query.id })
                .then((res) => {
                    this.formState = res;
                    this.showImage = res.image;
                    this.fileList = res.fileList;
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

        async getCategory() {
            let res = await apiwebview.getCategory();
            this.category = res;
        },
        async getBrand() {
            let res = await apiwebview.getBrand();
            this.brand = res;
        },
        async handlePreview(file) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }

            this.previewImage = file.url || file.preview;
            this.previewVisible = true;
        },
        async handleChange(file) {
            if (file.file.status === 'removed') {
                await api.deleteImage({ id: file.file.id }).then((res) => {
                    if (res.status === true) {
                        this.$message.success('Xóa ảnh thành công');
                    }
                }).catch((error) => {
                    this.$message.error('Xóa ảnh thất bại');
                    this.getDataUpdate();
                })
            }
        },
        handleCancel() {
            this.previewVisible = false;
        },
        cancel() {
            this.$router.push({ name: 'Product' });
        }
    }
}
</script>
<style lang="scss">
.product-create {
    .create {
        max-width: 1100px;
        margin: 0 auto;
        margin-top: 20px !important;
        margin-bottom: 20px !important;

        .main {
            background: #ffffff;
            padding: 20px 20px;
            border-radius: 10px;

            .ant-input-number {
                width: 100%
            }
        }
    }
}
</style>