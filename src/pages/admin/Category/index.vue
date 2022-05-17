<template>
    <div>
        <div class="header">
            <Breadcrums :title="'Danh sách Danh mục'">
                <template #action>
                    <a-space>
                        <a-button type="primary" size="large" @click="showModal()">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            Thêm mới danh mục
                        </a-button>
                    </a-space>
                </template>
            </Breadcrums>
        </div>
        <div class="admin-category">
            <div class="header-category">
                <div class="btn-add">
                    <a-space>
                        <a-input-search placeholder="Tìm kiếm danh mục" enter-button style="width: 300px"
                            v-model:value="textSearch" />
                    </a-space>
                </div>
            </div>
            <br>
            <div class="category-table">
                <a-table :columns="columns" :data-source="listCategory.data" bordered :pagination="false">
                    <template #stt="{ record }">
                        {{ record.index }}
                    </template>
                    <template #name="{ record }">
                        {{ record.name }}
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="showModal(record)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.id)" />
                    </template>
                    <template #footer>
                        <Pagination v-if="listCategory.last_page > 1" @paginate="getCategory"
                            :totalPage="listCategory.last_page" />
                    </template>
                </a-table>
            </div>
        </div>
        <ModalCategory :visible="visible" @cancel="handleCancel" :category="category" />
    </div>
</template>
<script>
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        slots: { customRender: 'stt' }
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
        slots: { customRender: 'name' },
        width: '60%'
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
import ModalCategory from '../../../components/admin/Category/ModalCategory.vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import moment from 'moment';
export default {
    name: "CategoryAdmin",
    components: { Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined, ModalCategory },
    data() {
        return {
            status: true,
            columns,
            listCategory: [],
            visible: false,
            category: {},
            textSearch: ''
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        async getCategory(data) {
            let params = {
                page: data ? data : 1,
                search: this.textSearch,
            }
            let res = await api.listCategory(params);
            this.listCategory = res;
            this.listCategory.data = res.data.map((category, index) => {
                const { id, name } = category;
                return {
                    index: index + 1,
                    key: id,
                    id: id,
                    name: name,
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa thể loại này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteCategory(data)
                        .then((res) => {
                            this.getCategory();
                            this.$message.success("Xóa thể loại thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },

        showModal(category) {
            this.category = category || null;
            this.visible = true;
        },
        handleCancel(result) {
            this.visible = false;
            if (result && result.ok) {
                this.getCategory();
            }
        },
        handleOk() {
            console.log('abc');
        },
    },
    watch: {
        textSearch: {
            handler(val) {
                this.getCategory();
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.admin-category {
    padding: 30px;

    .header-category {
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
.admin-category {
    .category-table {
        .ant-table-tbody tr td {
            text-align: center !important;
        }

        .ant-table-thead tr th {
            text-align: center !important;
        }
    }
}

.ant-modal-body {
    height: auto;
}
</style>