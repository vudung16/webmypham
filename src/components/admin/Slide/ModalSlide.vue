<template>
    <div>
        <a-modal :title="slide ? 'Chỉnh sửa slide' : 'Thêm mới slide'" :visible="visible"
            :confirm-loading="confirmLoading" @cancel="handleCancel" :okText="slide ? 'Cập nhật' : 'Thêm mới'"
            cancelText="Huỷ" @ok="handleOk">
            <div class="input-upload">
                <div class="status">
                    Trạng thái:
                    <a-switch v-model:checked="dataImages.status" />
                </div><br>
                <div class="image" v-if="!dataImages">
                    <a-input type="file" @change="onFileChange" />
                </div>
                <div v-else>
                    <img :src="image" style="width:100%;" />
                    <a-input type="file" @change="onFileChange" />
                </div>
            </div>
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
        slide: {
            type: Object,
        },
    },
    data() {
        return {
            image: '',
            confirmLoading: false,
            dataImages: {},
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
            formData.append('status', this.dataImages.status);
            api.createSlide(formData)
                .then((res) => {
                    if (res.status === false) {
                        this.$message.error(res.errors.image[0]);
                        this.confirmLoading = false;
                    } else {
                        this.confirmLoading = false;
                        this.$message.success("Tạo mới slide thành công");
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
            formData.append('slide_id', data.id);
            if (this.dataImages.image !== '') {
                formData.append('image', this.dataImages.image);
            }
            formData.append('status', data.status);
            api
                .updateSlide(formData)
                .then((res) => {
                    if (res.status === false) {
                        this.$message.error(res.errors.image[0]);
                    } else {
                        this.$message.success("Cập nhật slide thành công");
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
                id: this.slide ? this.slide.slide_id : '',
                status: this.dataImages.status,
                image: this.dataImages.image,
            };
            if (!this.slide) {
                this.create(data);
            } else {
                this.update(data);
            }
        },
    },
    watch: {
        slide(value) {
            if (value) {
                this.image = value.slide_image;
                this.dataImages = {
                    status: value.slide_status === 1 ? true : false,
                    image: ''
                }
            }
        },
    }

}
</script>