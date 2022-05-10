<template>
    <div>
        <div class="admin-voucher">
            <div class="header-voucher">
                <div class="title">Danh sách Voucher</div>
                <div class="btn-add">
                    <a-space>
                        <a-button type="primary" @click="addVoucher">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            Thêm mới
                        </a-button>
                    </a-space>
                </div>
            </div>
            <div class="filter-voucher">
                <a-space>
                    <a-range-picker v-model:value="search.date" />
                    <a-input placeholder="Tìm kiếm theo mã code" style="width: 300px"
                        v-model:value="search.textSearch" />
                    <a-button type="primary" @click="searchVoucher">Tìm kiếm</a-button>
                </a-space>
            </div>
            <div class="voucher-table">
                <a-table :columns="columns" :data-source="listVoucher.data" bordered :pagination="false">
                    <template #stt="{ record }">
                        {{ record.index }}
                    </template>
                    <template #code="{ record }">
                        {{ record.code }}
                    </template>
                    <template #image="{ record }">
                        <img style="width: 100%; height: 100px" v-bind:src="record.image" alt="">
                    </template>
                    <template #uses="{ record }">
                        {{ record.uses }}
                    </template>
                    <template #starts_at="{ record }">
                        {{ formatDate(record.starts_at) }}
                    </template>
                    <template #expires_at="{ record }">
                        {{ formatDate(record.expires_at) }}
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="showModal(record)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.id)" />
                    </template>
                    <template #footer>
                        <Pagination v-show="listVoucher.last_page > 1" @paginate="getVoucher"
                            :totalPage="listVoucher.last_page" />
                    </template>
                </a-table>
            </div>
        </div>
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
        title: 'Mã code',
        dataIndex: 'code',
        slots: { customRender: 'code' },
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        slots: { customRender: 'image' },
        width: '20%'
    },
    {
        title: 'Tổng số lượt',
        dataIndex: 'uses',
        slots: { customRender: 'uses' },
    },
    {
        title: 'Thời gian bắt đầu',
        dataIndex: 'starts_at',
        slots: { customRender: 'starts_at' },
    },
    {
        title: 'Thời gian kết thúc',
        dataIndex: 'expires_at',
        slots: { customRender: 'expires_at' },
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
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import moment from 'moment';
export default {
    components: { Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined },
    data() {
        return {
            columns,
            listVoucher: [],
            voucher: {},
            search: {
                textSearch: '',
                date: ''
            },
        }
    },
    created() {
        this.getVoucher();
    },
    methods: {
        async getVoucher(data) {
            let params = {
                page: data ? data : 1,
                search: this.search.textSearch,
                starts_at: this.date ? this.date[0] : '',
                expires_at: this.date ? this.date[1] : '',
            }
            let res = await api.listVoucher(params);
            this.listVoucher = res;
            this.listVoucher.data = res.data.map((voucher, index) => {
                const { id, code, image, uses, starts_at, expires_at } = voucher;
                return {
                    index: index + 1,
                    key: id,
                    id: id,
                    code: code,
                    image: image,
                    uses: uses,
                    starts_at: starts_at,
                    expires_at: expires_at
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa voucher này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteVoucher(data)
                        .then((res) => {
                            this.getVoucher();
                            this.$message.success("Xóa voucher thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },

        addVoucher() {
            this.$router.push({

            });
        },

        searchVoucher() {
            this.getVoucher();
        },

        formatDate(date) {
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('DD/MM/YYYY');
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.admin-voucher {
    padding: 30px;

    .header-voucher {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            margin: 0px 0px 30px 0px;
        }
    }

    .filter-voucher {
        margin-bottom: 20px;
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
.admin-voucher {
    .voucher-table {
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