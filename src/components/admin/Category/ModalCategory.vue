<template>
    <div>
        <a-modal :title="category ? 'Chỉnh sửa thể loại' : 'Thêm mới thể loại'" :visible="visible"
            :confirm-loading="confirmLoading" @cancel="handleCancel" :okText="category ? 'Cập nhật' : 'Thêm mới'"
            cancelText="Huỷ" @ok="handleOk">
            <a-form :model="formState" name="normal_login" class="login-form">
                <a-form-item label="Tên thể loại" name="name"
                    :rules="[{ required: true, message: 'Vui lòng nhập tên thể loại!' }]">
                    <a-input v-model:value="formState.name">
                    </a-input>
                </a-form-item>
            </a-form>
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
        category: {
            type: Object,
        },
    },
    data() {
        return {
            formState: {
                name: '',
            },
            confirmLoading: false,
        }
    },
    methods: {
        handleCancel() {
            this.$emit("cancel");
        },
        create(data) {
            api.createCategory(data)
                .then((res) => {
                    if (res.status === false) {
                        this.$message.error(res.errors.name[0]);
                        this.confirmLoading = false;
                    } else {
                        this.confirmLoading = false;
                        this.$message.success("Tạo mới thể loại thành công");
                        this.$emit("cancel", { ok: true });
                    }
                })
                .catch((err) => {
                    this.confirmLoading = false;
                    this.$message.error("Có lỗi xảy ra");
                });
        },
        async update(data) {
            api
                .updateCategory(data)
                .then((res) => {
                    if (res.status === false) {
                        this.$message.error(res.errors.name[0]);
                    } else {
                        this.$message.success("Cập nhật thể loại thành công");
                        this.$emit("cancel", { ok: true });
                    }
                })
                .catch((err) => {
                    console.log("Có lỗi xảy ra");
                    this.$message.error("Có lỗi xảy ra");
                });
            this.confirmLoading = false;
        },
        async handleOk(e) {
            if (!this.formState.name) {
                this.$message.error('Vui lòng nhập tên thể loại');
                return false;
            } else {
                this.confirmLoading = true;
                const data = {
                    id: this.category ? this.category.id : '',
                    name: this.formState.name
                };
                if (!this.category) {
                    this.create(data);
                } else {
                    this.update(data);
                }
            }
        },
    },
    watch: {
        category(value) {
            if (value) {
                this.formState.name = value.name;
            } else {
                this.formState.name = '';
            }
        },
    }

}
</script>