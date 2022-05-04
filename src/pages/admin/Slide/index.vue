<template>
    <div>
        <div class="admin-slide">
            <div class="title">Danh sách Slide</div>
            <div class="slide-table">
                <a-table :columns="columns" :data-source="listSlide.data" bordered :pagination="false">
                    <template #image="{ record }">
                        <img style="width: 100%; height: 200px" v-bind:src="record.slide_image" alt="">
                    </template>
                    <template #start="{ record }">
                        {{ record.created_at }}
                    </template>
                    <template #update="{ record }">
                        {{ record.updated_at }}
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="edit(record.slide_id)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.slide_id)"/>
                    </template>

                    <template #title>Trạng thái: <a-switch v-model:checked="status" /></template>
                    <template #footer><Pagination v-show="listSlide.last_page > 1" @paginate="getSlide" :totalPage="listSlide.last_page"/></template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script>
const columns = [
    {   
        title: 'Ảnh',
        dataIndex: 'image',
        slots: {customRender: 'image'},
        width: '60%'
    },
    {   
        title: 'Ngày tạo',
        dataIndex: 'start',
        slots: {customRender: 'start'},
    },
    {   
        title: 'Ngày cập nhật',
        dataIndex: 'update',
        slots: {customRender: 'update'},
    },
    {
        title: '',
        dataIndex: 'edit',
        slots: {customRender: 'edit'},
    },
    {
        title: '',
        dataIndex: 'delete',
        slots: {customRender: 'delete'},
    }
]
import { DeleteOutlined, FormOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import Pagination from '../../../components/admin/common/Pagination.vue';
import api from '../../../api/admin';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
export default {
    components:{Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined},
    data() {
        return {
            status: true,
            columns,
            listSlide: [],
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
            this.listSlide = res
        },
        edit(id) {
            let res = api.deleteSlide(id);

        },

        remove(id) {
            Modal.confirm({
                title:() => "Bạn có chắc chắn muốn xóa slide này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText:() => "Xóa",
                cancelText:() => "Đóng",
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
        }

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
    .title {
        font-size: 20px;
        margin: 0px 0px 30px 0px;
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