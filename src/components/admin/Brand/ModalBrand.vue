<template>
    <div>
        <a-modal class="form-brand" :title="brand ? 'Chỉnh sửa thương hiệu' : 'Thêm mới thương hiệu'"
            :visible="visible">
            <div class="input-upload">
                <div class="form-name">
                    <div class="txt-name">
                        <label for="txt-name"> Tên Thương Hiệu<span style="color:red">*</span></label>
                    </div>
                    <div>
                        <a-input v-model:value="dataImages.name"></a-input>
                        <span v-if="errors.name" style="color: red">{{ errors.name[0] }}</span>
                    </div>
                </div>
                <div class="form-image">
                    <div class="txt-image">
                        <label for="txt-name"> Ảnh Thương Hiệu<span v-if="!brand" style="color:red">*</span></label>
                    </div>
                    <div class="image" v-if="!dataImages">
                        <a-input type="file" @change="onFileChange" />
                    </div>
                    <div v-else>
                        <img :src="image" style="width:100%;" />
                        <a-input type="file" @change="onFileChange" />
                    </div>
                    <span v-if="errors.image" style="color: red">{{ errors.image[0] }}</span>
                </div>
            </div>
            <template #footer>
                <a-button key="back" @click="handleCancel">Hủy</a-button>
                <a-button key="submit" type="primary" :loading="confirmLoading" html-type="submit" @click="handleOk">
                    {{ brand ? 'Cập nhật' : 'Thêm mới' }}
                </a-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
import api from '../../../api/admin';
export default {
    props: {
        visible: {
            type: Boolean,
        },
        brand: {
            type: Object,
        },
    },
    data() {
        return {
            name: '',
            image: '',
            confirmLoading: false,
            dataImages: {},
            errors: [],
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            this.dataImages.image = files[0];
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        handleCancel() {
            this.$emit("cancel");
        },
        create(data) {
            const formData = new FormData();
            formData.append('image', this.dataImages.image ? this.dataImages.image : '');
            formData.append('name', this.dataImages.name);
            api.createBrand(formData)
                .then((res) => {
                    if (res.status === false) {
                        this.errors = res.errors;
                        this.confirmLoading = false;
                    } else {
                        this.confirmLoading = false;
                        this.$message.success("Tạo mới thương hiệu thành công");
                        this.$emit("cancel", { ok: true });
                    }
                })
                .catch((err) => {
                    this.confirmLoading = false;
                    this.$message.error("Có lỗi xảy ra");
                });
        },
        async update(data) {
            const formData = new FormData();
            formData.append('id', data.id);
            if (this.dataImages.image !== '') {
                formData.append('image', this.dataImages.image);
            }
            formData.append('name', data.name);
            api
                .updateBrand(formData)
                .then((res) => {
                    if (res.status === false) {
                        this.errors = res.errors;
                        this.confirmLoading = false;
                    } else {
                        this.confirmLoading = false;
                        this.$message.success("Cập nhật thương hiệu thành công");
                        this.$emit("cancel", { ok: true });
                    }
                })
                .catch((err) => {
                    console.log("Có lỗi xảy ra");
                    this.$message.error("Có lỗi xảy ra");
                });
            this.confirmLoading = false;
        },
        handleOk(e) {
            this.confirmLoading = true;
            const data = {
                id: this.brand ? this.brand.id : '',
                image: this.dataImages.image,
                name: this.dataImages.name
            };
            if (!this.brand) {
                this.create(data);
            } else {
                this.update(data);
            }
        },
    },
    watch: {
        brand(value) {
            if (value) {
                this.errors = [];
                this.image = value.image;
                this.dataImages = {
                    name: value.name,
                    image: ''
                }
            } else {
                this.dataImages = [];
                this.image = '';
            }
        },
    }

}
</script>
<style lang="scss">
.form-brand {
    .input-upload {
        .form-name {
            margin-bottom: 20px;
        }
    }
}
</style>