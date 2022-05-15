<template>
    <div>
        <div class="header">
            <Breadcrums :title="'Danh sách thương hiệu'">
                <template #action>
                    <a-space>
                        <a-button type="primary" size="large" @click="showModal()">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            Thêm mới thương hiệu
                        </a-button>
                    </a-space>
                </template>
            </Breadcrums>
        </div>
        <div class="admin-brand">
            <div class="header-category">
                <div class="btn-add">
                    <a-space>
                        <a-input-search placeholder="Tìm kiếm thương hiệu" enter-button style="width: 300px"
                            v-model:value="textSearch" />
                    </a-space>
                </div>
            </div>
            <br>
            <div class="brand-table">
                <a-table :columns="columns" :data-source="listBrand.data" bordered :pagination="false">
                    <template #stt="{ record }">
                        {{ record.index }}
                    </template>
                    <template #name="{ record }">
                        {{ record.name }}
                    </template>
                    <template #image="{ record }">
                        <img style="width: 100%; height: 200px" v-bind:src="record.image" alt="">
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="showModal(record)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.id)" />
                    </template>
                    <template #footer>
                        <Pagination v-show="listBrand.last_page > 1" @paginate="getBrand"
                            :totalPage="listBrand.last_page" />
                    </template>
                </a-table>
            </div>
        </div>
        <ModalBrand :visible="visible" @cancel="handleCancel" :brand="brand" />
    </div>
</template>
<script>
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        slots: { customRender: 'stt' },
    },
    {
        title: 'Tên thương hiệu',
        dataIndex: 'name',
        slots: { customRender: 'name' },
    },
    {
        title: 'Ảnh',
        dataIndex: 'image',
        slots: { customRender: 'image' },
        width: '50%'
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
import ModalBrand from '../../../components/admin/Brand/ModalBrand.vue';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import moment from 'moment';
export default {
    components: { Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined, ModalBrand },
    data() {
        return {
            columns,
            listBrand: [],
            visible: false,
            brand: {},
            textSearch: ''
        }
    },
    created() {
        this.getBrand();
    },
    methods: {
        async getBrand(data) {
            let params = {
                page: data ? data : 1,
                search: this.textSearch,
            }
            let res = await api.listBrand(params);
            this.listBrand = res;
            this.listBrand.data = res.data.map((brand, index) => {
                const { id, image, name } = brand;
                return {
                    index: index + 1,
                    key: id,
                    id: id,
                    image: image,
                    name: name,
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa thương hiệu này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteBrand(data)
                        .then((res) => {
                            this.getBrand();
                            this.$message.success("Xóa thương hiệu thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },

        showModal(brand) {
            this.brand = brand || null;
            this.visible = true;
        },
        handleCancel(result) {
            this.visible = false;
            if (result && result.ok) {
                this.getBrand();
            }
        },
        handleOk() {
            console.log('abc');
        },
        formatDate(date) {
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('MM/DD/YYYY');
            }
        },
    },
    watch: {
        textSearch: {
            handler(val) {
                console.log(val);
                this.getBrand();
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.admin-brand {
    padding: 30px;

    .header-brand {
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
.admin-brand {
    .ant-table-tbody tr td {
        text-align: center !important;
    }

    .ant-table-thead tr th {
        text-align: center !important;
    }
}

.ant-modal-body {
    height: auto;
}
</style>