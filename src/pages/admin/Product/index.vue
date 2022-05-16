<template>
    <div>
        <div class="header">
            <Breadcrums :title="'Danh sách Product'">
                <template #action>
                    <a-space>
                        <a-button type="primary" size="large" @click="addProduct">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            Thêm mới Sản phẩm
                        </a-button>
                    </a-space>
                </template>
            </Breadcrums>
        </div>
        <div class="admin-product">
            <div class="filter-product">
                <a-space>
                    <a-input placeholder="Tìm kiếm theo mã tên" style="width: 300px"
                        v-model:value="search.textSearch" />
                    <a-select placeholder="Thể loại" :allowClear="true" class="full-width"
                        v-model:value="search.category" style="width: 300px">
                        <a-select-option v-for="category in category" :value="category.id" :key="category.id">
                            {{ category.name }}
                        </a-select-option>
                    </a-select>
                    <a-select placeholder="Thương hiệu" :allowClear="true" class="full-width"
                        v-model:value="search.brand" style="width: 300px">
                        <a-select-option v-for="brand in brand" :value="brand.id" :key="brand.id">
                            {{ brand.name }}
                        </a-select-option>
                    </a-select>
                    <a-button type="primary" @click="searchProduct">Tìm kiếm</a-button>
                </a-space>
            </div>
            <div class="product-table">
                <a-table :columns="columns" :data-source="listProduct.data" bordered :pagination="false">
                    <template #stt="{ record }">
                        {{ record.index }}
                    </template>
                    <template #name="{ record }">
                        {{ record.name }}
                    </template>
                    <template #price="{ record }">
                        {{ formatVND(record.price) }}
                    </template>
                    <template #image="{ record }">
                        <img style="width: 100%; height: 100px" v-bind:src="record.image" alt="">
                    </template>
                    <template #discount="{ record }">
                        {{ record.discount }}
                    </template>
                    <template #selling="{ record }">
                        {{ record.selling }}
                    </template>
                    <template #edit="{ record }">
                        <FormOutlined @click="update(record)" />
                    </template>
                    <template #delete="{ record }">
                        <DeleteOutlined @click="remove(record.id)" />
                    </template>
                    <template #footer>
                        <Pagination v-if="listProduct.last_page > 1" @paginate="getProduct"
                            :totalPage="listProduct.last_page" />
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
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        slots: { customRender: 'name' },
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
        slots: { customRender: 'price' },
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        slots: { customRender: 'image' },
        width: '20%'
    },
    {
        title: 'Giảm giá (%)',
        dataIndex: 'discount',
        slots: { customRender: 'discount' },
    },
    {
        title: 'Số lượng đã bán',
        dataIndex: 'selling',
        slots: { customRender: 'selling' },
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
import apiwebview from '../../../api/homewebview';
import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import moment from 'moment';
export default {
    name: 'ListProduct',
    components: { Pagination, DeleteOutlined, FormOutlined, ExclamationCircleOutlined, PlusOutlined },
    data() {
        return {
            columns,
            listProduct: [],
            product: {},
            search: {
                textSearch: '',
                brand: undefined,
                category: undefined,
            },
            brand: {},
            category: {},
        }
    },
    created() {
        this.getProduct();
        this.listBrand();
        this.listCategory();
    },
    methods: {
        async getProduct(data) {
            let params = {
                page: data ? data : 1,
                search: this.search.textSearch,
                brand: this.search.brand,
                category: this.search.category,
            }
            let res = await api.listProduct(params);
            this.listProduct = res;
            this.listProduct.data = res.data.map((product, index) => {
                const { id, name, image, price, discount, selling } = product;
                return {
                    index: index + 1,
                    key: id,
                    id: id,
                    name: name,
                    image: image,
                    price: price,
                    discount: discount,
                    selling: selling
                }
            })
        },

        remove(id) {
            Modal.confirm({
                title: () => "Bạn có chắc chắn muốn xóa sản phẩm này",
                icon: () => createVNode(ExclamationCircleOutlined),
                okText: () => "Xóa",
                cancelText: () => "Đóng",
                onOk: () => {
                    const data = {
                        id: id,
                    };
                    api.deleteProduct(data)
                        .then((res) => {
                            this.getProduct();
                            this.$message.success("Xóa product thành công");
                        })
                        .catch((err) => {
                            this.$message.error("Có lỗi xảy ra");
                        });
                },
            });
        },
        update(record) {
            this.$router.push({
                name: 'ProductUpdate', query: {
                    id: record.id,
                },
            })
        },
        async listCategory() {
            let res = await apiwebview.getCategory();
            this.category = res;
        },
        async listBrand() {
            let res = await apiwebview.getBrand();
            this.brand = res;
        },
        addProduct() {
            this.$router.push({ name: 'ProductCreate' })
        },

        searchProduct() {
            this.getProduct();
        },
        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        }
    },
}
</script>
<style lang="scss" scoped>
.admin-product {
    padding: 30px;

    .header-product {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 20px;
            margin: 0px 0px 30px 0px;
        }
    }

    .filter-product {
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
.admin-product {
    .product-table {
        .ant-table-tbody tr td {
            text-align: center !important;
        }

        .ant-table-thead tr th {
            text-align: center !important;
        }
    }
}
</style>