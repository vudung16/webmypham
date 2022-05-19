<template>
    <div class="import-product">
        <div class="header">
            <Breadcrums :title="'Nhập kho'">
                <template #action>
                    <a-button type="primary" size="large" :disabled="dataProduct.length ? false : true"
                        @click="importWarehouse">Nhập kho</a-button>
                </template>
            </Breadcrums>
        </div>
        <div class="content-import">
            <a-row :gutter="30">
                <a-col :span="12">
                    <div class="input-search">
                        <h3>Tìm kiếm sản phẩm cần nhập</h3>
                        <a-input-search v-model:value="search" placeholder="Tìm kiếm sản phẩm" size="large"
                            @search="onSearch">
                            <template #enterButton>
                                <a-button>Tìm kiếm</a-button>
                            </template>
                        </a-input-search>
                    </div>
                    <div class="list-product" v-if="visiable">
                        <a-list class="demo-loadmore-list" item-layout="horizontal" :data-source="dataList">
                            <template #renderItem="{ item }">
                                <a-list-item>
                                    <template #actions>
                                        <a @click="selectProduct(item)">chọn</a>
                                    </template>
                                    <a-list-item-meta>
                                        <template #title>
                                            <a href="https://www.antdv.com/">{{ item.name }}</a>
                                        </template>
                                        <template #avatar>
                                            <a-avatar :src="item.image" />
                                        </template>
                                    </a-list-item-meta>
                                </a-list-item>
                            </template>
                        </a-list>
                    </div>
                </a-col>
                <a-col :span="12">
                    <h3>Danh sách sản phẩm cần nhập</h3>
                    <div class="warehouse-product" v-if="dataProduct.length">
                        <a-table :columns="columns" :data-source="dataProduct" bordered :pagination="false"
                            :scroll="{ y: 500 }">
                            <template #image="{ record }">
                                <img style="width: 200px; height: 100px" v-bind:src="record.image" alt="">
                            </template>
                            <template #name="{ record }">
                                {{ record.name }}
                            </template>
                            <template #quantity="{ record }">
                                <a-input-number v-model:value="record.quantity" />
                            </template>
                            <template #delete="{ record }">
                                <DeleteOutlined @click="remove(record.id)" />
                            </template>
                        </a-table>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
const columns = [
    {
        title: 'Ảnh',
        dataIndex: 'image',
        slots: { customRender: 'image' },
        width: '40%'
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        slots: { customRender: 'name' },
    },
    {
        title: 'Số lượng nhập',
        dataIndex: 'quantity',
        slots: { customRender: 'quantity' },
        width: 150
    },
    {
        title: '',
        dataIndex: 'delete',
        slots: { customRender: 'delete' },
        width: 50
    }
];
import { DeleteOutlined } from '@ant-design/icons-vue';
import apiAdmin from '../../../api/admin';
export default {
    name: 'ImportProduct',
    components: { DeleteOutlined },
    data() {
        return {
            search: '',
            loading: false,
            dataList: [],
            dataProduct: [],
            columns,
            visiable: false,
        }
    },
    methods: {
        async onSearch() {
            let params = {
                search: this.search
            }
            let res = await apiAdmin.searchProduct(params);
            if (res) {
                this.dataList = res;
                this.visiable = true;
            }
        },
        selectProduct(value) {
            let params = {
                id: value.id,
                image: value.image,
                name: value.name,
                quantity: 0
            }
            this.dataProduct.push(params);
            this.visiable = false;

        },
        async importWarehouse() {
            let res = await apiAdmin.importWarehouse(this.dataProduct);
            if (res.status === true) {
                this.$message.success('Nhập kho thành công');
                this.$router.push({ name: 'Dashboard' });
            } else {
                this.$message.error('Nhập kho thất bại');
            }
        },
        remove(id) {
            let index = this.dataProduct.findIndex(product => product.id === id);
            this.dataProduct.splice(index, 1);
        }
    }
}
</script>
<style lang="scss">
.content-import {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0px 0px 0px;

    .list-product {
        overflow: auto;
    }

    .ant-list {
        background: #ffffff;
        padding: 5px 20px;
    }

    h3 {
        text-align: center;
        margin-bottom: 30px;
    }
}
</style>