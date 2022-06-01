<template>
    <div>
        <div class="header">
            <Breadcrums :title="'Quản lý người dùng'">
                <template #action>
                    <a-space>
                        <a-button type="primary" size="large" @click="createAccount">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            Thêm tài khoản
                        </a-button>
                    </a-space>
                </template>
            </Breadcrums>
        </div>
        <div class="admin-user">
            <div class="header-user">
                <div class="btn-add">
                    <a-space>
                        <a-input-search placeholder="Tìm kiếm người dùng" enter-button style="width: 300px"
                            v-model:value="textSearch" />
                    </a-space>
                </div>
            </div>
            <br>
            <div class="user-table" v-if="listUser.data">
                <a-table :columns="columns" :data-source="listUser.data" bordered :pagination="false">
                    <template #stt="{ record }">
                        {{ record.index }}
                    </template>
                    <template #email="{ record }">
                        {{ record.email }}
                    </template>
                    <template #order="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 1)"
                            @change="updatePermissionUser(record, 1)">
                        </a-checkbox>
                    </template>
                    <template #slide="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 2)"
                            @change="updatePermissionUser(record, 2)">
                        </a-checkbox>
                    </template>
                    <template #product="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 4)"
                            @change="updatePermissionUser(record, 4)">
                        </a-checkbox>
                    </template>
                    <template #voucher="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 8)"
                            @change="updatePermissionUser(record, 8)">
                        </a-checkbox>
                    </template>
                    <template #user="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 16)"
                            @change="updatePermissionUser(record, 16)">
                        </a-checkbox>
                    </template>
                    <template #brand="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 32)"
                            @change="updatePermissionUser(record, 32)">
                        </a-checkbox>
                    </template>
                    <template #category="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 64)"
                            @change="updatePermissionUser(record, 64)">
                        </a-checkbox>
                    </template>
                    <template #warehouse="{ record }">
                        <a-checkbox
                            :checked="permissionChecked(record.role_admin, 128)"
                            @change="updatePermissionUser(record, 128)">
                        </a-checkbox>
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.id)" />
                    </template>
                    <template #footer>
                        <Pagination v-if="listUser.last_page > 1" @paginate="getUser"
                            :totalPage="listUser.last_page" />
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
        align: 'center',
        dataIndex: 'stt',
        slots: {customRender: 'stt'},
    },
    {
        title: 'Email',
        dataIndex: 'email',
        slots: {customRender: 'email'},
    },
    {
        title: 'Đơn hàng',
        align: 'center',
        dataIndex: 'order',
        slots: {customRender: 'order'},
    },
    {
        title: 'Sản phẩm',
        align: 'center',
        dataIndex: 'product',
        slots: {customRender: 'product'},
    },
    {
        title: 'Slide',
        align: 'center',
        dataIndex: 'slide',
        slots: {customRender: 'slide'},
    },
    {
        title: 'Voucher',
        align: 'center',
        dataIndex: 'voucher',
        slots: {customRender: 'voucher'},
    },
    {
        title: 'Tài khoản',
        align: 'center',
        dataIndex: 'user',
        slots: {customRender: 'user'},
    },
    {
        title: 'Thương hiệu',
        align: 'center',
        dataIndex: 'brand',
        slots: {customRender: 'brand'},
    },
    {
        title: 'Danh mục',
        align: 'center',
        dataIndex: 'category',
        slots: {customRender: 'category'},
    },
    {
        title: 'Nhập kho',
        align: 'center',
        dataIndex: 'warehouse',
        slots: {customRender: 'warehouse'},
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
            listUser: [],
            visible: false,
            user: {},
            textSearch: ''
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        async getUser(data) {
            let params = {
                page: data ? data : 1,
                search: this.textSearch,
            }
            let res = await api.listUser(params);
            this.listUser = res.data;
            this.listUser.data = res.data.data.map((user, index) => {
                const { id, email, role_admin } = user;
                return {
                    index: index + 1,
                    key: id,
                    id: id,
                    email: email,
                    role_admin: role_admin
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa tài khoản này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteUser(data)
                        .then((res) => {
                            this.getUser();
                            this.$message.success("Xóa tài khoản thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },

        permissionChecked(role, permission) {
            return !!(role & permission);
        },

        async updatePermissionUser(user, permission) {
            if (user.role_admin & permission) {
                user.role_admin = user.role_admin - permission;
            } else {
                user.role_admin = user.role_admin + permission;
            }
            let params = {
                id: user.id,
                role: user.role_admin
            }
            await api.updateRole(params).then(res => {
                this.$message.success('Phân quyền thành công');
            }).catch(err => {
            this.listUser.data.map(row => {
                if (row.id === params.id) {
                    row.role_admin = user.permission;
                }
                return row;
            });
                this.$message.error('Lỗi hệ thống');
                console.log('err update permission', err);
            });
        },

        createAccount() {
            this.$router.push({name:'CreateUser'});
        },

        formatDate(date) {
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('DD/MM/YYYY');
            }
        },
    },
    watch: {
        textSearch: {
            handler(val) {
                console.log(val);
                this.getUser();
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.admin-user {
    padding: 30px;

    .header-user {
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
.admin-user {
    .ant-table-tbody tr td {
        text-align: center !important;
    }

    .ant-table-thead tr th {
        text-align: center !important;
    }
}
</style>