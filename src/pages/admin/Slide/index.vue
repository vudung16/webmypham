<template>
    <div>
        <div class="admin-slide">
            <div class="header-slide">
                <div class="title">Danh sách slide</div>
                <div class="btn-add">
                    <a-button type="primary" shape="round" @click="showModal()">
                        <template #icon>
                            <plus-outlined />
                        </template>
                        Thêm mới
                    </a-button>
                </div>
            </div>
            <div class="slide-table">
                <a-table :columns="columns" :data-source="listSlide.data" bordered :pagination="false">
                    <template #image="{ record }">
                        <img style="width: 100%; height: 200px" v-bind:src="record.slide_image" alt="">
                    </template>
                    <template #start="{ record }">
                        {{ formatDate(record.created_at) }}
                    </template>
                    <template #update="{ record }">
                        {{ formatDate(record.updated_at) }}
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="showModal(record)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.slide_id)" />
                    </template>

                    <template #title>Trạng thái:
                        <a-switch v-model:checked="status" />
                    </template>
                    <template #footer>
                        <Pagination v-show="listSlide.last_page > 1" @paginate="getSlide"
                            :totalPage="listSlide.last_page" />
                    </template>
                </a-table>
            </div>
        </div>
        <ModalSlide :visible="visible" @cancel="handleCancel" :slide="slide" />
    </div>
</template>
<script>
const columns = [
    {
        title: 'Ảnh',
        dataIndex: 'image',
        slots: { customRender: 'image' },
        width: '60%'
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'start',
        slots: { customRender: 'start' },
    },
    {
        title: 'Ngày cập nhật',
        dataIndex: 'update',
        slots: { customRender: 'update' },
    },
    {
        title: '',
        dataIndex: 'edit',
        slots: { customRender: 'edit' },
    },
    {
        title: '',
        dataIndex: 'delete',
        slots: { customRender: 'delete' },
    }
]
import { DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import Pagination from '../../../components/admin/common/Pagination.vue';
import api from '../../../api/admin';
import ModalSlide from '../../../components/admin/Slide/ModalSlide.vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import moment from 'moment';
export default {
    components: { Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined, ModalSlide },
    data() {
        return {
            status: true,
            columns,
            listSlide: [],
            visible: false,
            slide: {},
        }
    },
    created() {
        this.getSlide();
    },
    methods: {
        async getSlide(data) {
            let params = {
                page: data ? data : 1,
                status: this.status ? 1 : 0
            }
            let res = await api.listSlide(params);
            this.listSlide = res;
            this.listSlide.data = res.data.map((slide, index) => {
                const { slide_id, slide_image, slide_status, created_at, updated_at } = slide;
                return {
                    index: index + 1,
                    key: slide_id,
                    slide_id: slide_id,
                    slide_image: slide_image,
                    slide_status: slide_status,
                    created_at: created_at,
                    updated_at: updated_at
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa slide này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteSlide(data)
                        .then((res) => {
                            this.getSlide();
                            this.$message.success("Xóa slide thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },

        showModal(slide) {
            this.slide = slide || null;
            this.visible = true;
            console.log(slide);
        },
        handleCancel(result) {
            this.visible = false;
            if (result && result.ok) {
                this.getSlide();
            }
        },
        handleOk() {
            console.log('abc');
        },
        formatDate(date) {
            console.log(date);
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('MM/DD/YYYY');
            }
        },
    },
    watch: {
        status: {
            handler(val) {
                this.getSlide();
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.admin-slide {
    padding: 30px;

    .header-slide {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            margin: 0px 0px 30px 0px;
        }
    }

    .anticon-form {
        color: green;
        font-size: 19px;
    }

    .anticon-delete {
        font-size: 19px;
        color: red;
    }
}
</style>
<style lang="scss">
.admin-slide {
    .ant-table-tbody tr td {
        text-align: center !important;
    }
}

.ant-modal-body {
    height: auto;
}
</style>