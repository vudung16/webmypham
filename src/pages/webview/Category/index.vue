<template>
    <div class="main-category">
        <div class="product-breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <span>Danh mục</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item v-if="$route.params.id && CategoryProduct.category">
                    {{ CategoryProduct.category.name }}</a-breadcrumb-item>
                <a-breadcrumb-item v-else>Search</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="voucher">
            <a-card>
                <a-card-grid v-for="(item, index) in listVoucher" :key="item.index"
                    style="width: 25%; text-align: center" :bordered="false">
                    <div class="coupon">
                        <div class="image">
                            <img width="100" height="50" v-bind:src="item.image" alt="">
                        </div>
                        <div class="content">
                            <div class="title">NHẬP MÃ: {{ item.code }}</div>
                            <div class="describe">
                                {{ item.name }}
                            </div>
                            <div class="condition">
                                <a @click="showVoucher(index)">Chi tiết</a>
                            </div>
                        </div>
                    </div>
                </a-card-grid>
            </a-card>
        </div>
        <div class="main-category-content">
            <a-row :gutter="16">
                <a-col :span="6">
                    <Filter @searchCategory="handleCategory" />
                </a-col>
                <a-col :span="18">
                    <Category @searchArrange="handleArrange" />
                </a-col>
            </a-row>
        </div>
        <div class="for-you">
            <a-card title="Dành cho bạn">
                <template #extra>
                    <a class="see-all" href="#">
                        <span class="text">Xem tất cả </span>
                        <span class="icon">
                            <svg class="icon-outline" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                viewBox="0 0 490.4 490.4" style="enable-background:new 0 0 490.4 490.4;"
                                xml:space="preserve">
                                <path fill="#1890FF"
                                    d="M245.2,490.4c135.2,0,245.2-110,245.2-245.2S380.4,0,245.2,0S0,110,0,245.2S110,490.4,245.2,490.4z M245.2,24.5    c121.7,0,220.7,99,220.7,220.7s-99,220.7-220.7,220.7s-220.7-99-220.7-220.7S123.5,24.5,245.2,24.5z" />
                                <path fill="#1890FF"
                                    d="M138.7,257.5h183.4l-48,48c-4.8,4.8-4.8,12.5,0,17.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l68.9-68.9    c4.8-4.8,4.8-12.5,0-17.3l-68.9-68.9c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l48,48H138.7c-6.8,0-12.3,5.5-12.3,12.3    C126.4,252.1,131.9,257.5,138.7,257.5z" />
                            </svg>
                        </span>
                    </a>
                </template>
                <a-card-grid v-for="product in getProduct" :key="product.id" style="width: 20%; text-align: center">

                    <img alt="example" v-bind:src="product.image" @click="redirectProduct(product.id)" />

                    <a-card-meta>
                        <template #title>{{ product.name }}</template>
                        <template #description>
                            <div v-html="product.description"></div>
                        </template>
                    </a-card-meta>


                    <div v-if="product.discount">
                        <span class="money">{{ formatVND(product.price - ((product.discount / 100) *
                                product.price))
                        }}&emsp;</span>
                        <span class="sale"><del>{{ formatVND(product.price) }}</del></span>
                    </div>
                    <div v-else>
                        <span class="money">{{ formatVND(product.price) }}</span>
                    </div>

                    <div class="icon-card" @click="addToCart(product.id)">
                        <img width="30" height="30" src="../../../assets/images/add-to-card.png" alt="">
                    </div>
                </a-card-grid>
            </a-card>
        </div>
        <a-modal v-model:visible="visible" :title="'NHẬP MÃ:' + voucher.code">
            <div class="code">Mã khuyến mãi: {{ voucher.code }}</div>
            <div class="condition">
                <div class="describe">{{ voucher.describe }}</div>
                <div class="min">Đơn tối thiểu: {{ formatVND(voucher.minimum_order) }} - Tối đa {{
                        formatVND(voucher.discount_amount)
                }}</div>
                <div class="quantity">Mỗi khách hàng được sử dụng tối đa {{ voucher.quantity }} lần</div>
                <div class="start_date">Ngày bắt đầu: {{ formatDate(voucher.start_date) }} </div>
                <div class="end_date">Ngày kết thúc: {{ formatDate(voucher.end_date) }} </div>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { HomeOutlined, } from '@ant-design/icons-vue';
import Filter from "../../../components/category/Filter.vue";
import Category from "../../../components/category/Category.vue";
import api from "../../../api/homewebview";
import moment from 'moment';
import { forEach } from 'lodash';
export default {
    name: "Home",
    components: {
        Filter,
        Category,
        HomeOutlined,
    },
    props: ['search'],

    data() {
        return {
            getProduct: '',
            listVoucher: '',
            dataFilter: {
                searchValue: { ...this.search },
                category_id: '',
                filter: {
                    brand: [],
                    total: [0, 5000000],
                },
                arrange: ['az'],
            },
            visible: false,
            voucher: '',
        }
    },

    created() {
        this.dataFilter.category_id = this.$route.params.id;
        this.vouchers();
        this.categoryProduct();
        this.getBrand();
        this.getProducts();
    },

    computed: {
        CategoryProduct() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct))
            if (shoppingCart) {
                // this.listProduct = JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct.product))
                return JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct));
            }
        }
    },

    methods: {
        handleCategory(data) {
            let params = JSON.parse(JSON.stringify(data));
            this.dataFilter.filter = params;
        },
        handleArrange(data) {
            let params = JSON.parse(JSON.stringify(data));
            this.dataFilter.arrange = params;
        },
        async vouchers() {
            let res = await api.listVoucher();
            this.listVoucher = res;
        },
        categoryProduct() {
            this.dataFilter.searchValue = localStorage.getItem('search')
            this.$store.dispatch('product/categoryProduct', this.dataFilter);
            localStorage.removeItem("search");
        },
        async getBrand() {
            let arr = [];
            let res = await api.getBrand();
            res.forEach(item => {
                arr.push(item.brand_id);
            });
            this.dataFilter.filter.brand = arr;
        },
        async getProducts() {
            let res = await api.getProduct();
            this.getProduct = res.product.slice(0, 5);
        },
        addToCart(id) {
            let params = {
                product_id: id,
                quantity: 1
            };

            this.$store.dispatch('product/cartData', params);
            this.$message.success('Thêm vào giỏ hàng thành công');
        },

        showVoucher(index) {
            this.visible = true;
            this.voucher = this.listVoucher[index];
        },

        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },

        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        }
    },

    watch: {
        dataFilter: {
            handler(val) {
                this.$store.dispatch('product/categoryProduct', this.dataFilter);
            },
            deep: true
        },
        search: {
            immediate: true,
            handler(newVal, oldVal) {
                this.dataFilter.searchValue = newVal;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/webview/category.scss";
</style>
<style lang="scss">
.main-category {
    .voucher {
        margin: 20px 0px 30px 0px !important;

        .ant-card-grid {
            .coupon {
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -3px;
                    height: 100%;
                    width: 10px;
                    color: #fff;
                    background-clip: padding-box;
                    background: repeating-linear-gradient(#e5e5e5, #e5e5e5 5px, transparent 0, transparent 9px, #e5e5e5 0, #e5e5e5 10px) 0/1px 100% no-repeat, radial-gradient(circle at 0 7px, transparent, transparent 2px, #e5e5e5ee 0, #e5e5e5 3px, currentColor 0) 1px 0/100% 10px repeat-y;
                }

                &::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: -3px;
                    height: 100%;
                    width: 10px;
                    color: #fff;
                    background-clip: padding-box;
                    background: repeating-linear-gradient(#e5e5e5, #e5e5e5 5px, transparent 0, transparent 9px, #e5e5e5 0, #e5e5e5 10px) 0/1px 100% no-repeat, radial-gradient(circle at 0 7px, transparent, transparent 2px, #e5e5e5ee 0, #e5e5e5 3px, currentColor 0) 1px 0/100% 10px repeat-y;
                }
            }
        }
    }

    .ant-card-grid {
        padding: 7px;
    }

    .ant-card-bordered {
        border: none;
    }

    .for-you {
        .ant-card-head-title {
            color: #d82e4d;
            font-size: 20px;
            font-weight: 800;
        }

        .ant-card-meta-detail {
            padding: 20px 0px;
            text-align: left;
        }

        .ant-card-grid {
            text-align: left !important;
            height: 100%;
            cursor: pointer;
        }

        .ant-card-grid-hoverable:hover .icon-card {
            display: inline;
        }

        .ant-card-meta-description>div {
            text-overflow: ellipsis;
            overflow: hidden;
            width: 185px;
            height: 1.2em;
            white-space: nowrap;
        }
    }
}
</style>