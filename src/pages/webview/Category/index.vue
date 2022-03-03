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
                <a-breadcrumb-item>abc</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="voucher">
            <a-card>
                <a-card-grid v-for="item in listVoucher" :key="item.index" style="width: 25%; text-align: center" :bordered="false">
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
                                <a href="">Chi tiết</a>
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
                    <Category @searchArrange="handleArrange"/>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { HomeOutlined, } from '@ant-design/icons-vue';
import Filter from "../../../components/category/Filter.vue";
import Category from "../../../components/category/Category.vue";
import api from "../../../api/homewebview";
import { forEach } from 'lodash';
    export default {
        name: "Home",
        components: {
            Filter,
            Category,
            HomeOutlined,
        },

        data() {
            return {
                listVoucher: '',
                dataFilter: {
                    category_id: '', 
                    filter: {
                        brand: [],
                        total: [0, 5000000],
                    },
                    arrange: ['az'],
                },
            }
        },

        created() {
            this.dataFilter.category_id = this.$route.params.id;
            this.vouchers();
            this.categoryProduct();
            this.getBrand();
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
                this.$store.dispatch('product/categoryProduct', this.dataFilter);
            },
            async getBrand() {
                let arr = [];
                let res = await api.getBrand();
                res.forEach(item => {
                    arr.push(item.brand_id);
                });
                this.dataFilter.filter.brand = arr;
            }
        },

        watch: {
            dataFilter: {
                handler(val) {
                    this.$store.dispatch('product/categoryProduct', this.dataFilter);
                },
                deep: true
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
                    background: repeating-linear-gradient(#e5e5e5,#e5e5e5 5px,transparent 0,transparent 9px,#e5e5e5 0,#e5e5e5 10px) 0/1px 100% no-repeat,radial-gradient(circle at 0 7px,transparent,transparent 2px,#e5e5e5ee 0,#e5e5e5 3px,currentColor 0) 1px 0/100% 10px repeat-y;
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
                    background: repeating-linear-gradient(#e5e5e5,#e5e5e5 5px,transparent 0,transparent 9px,#e5e5e5 0,#e5e5e5 10px) 0/1px 100% no-repeat,radial-gradient(circle at 0 7px,transparent,transparent 2px,#e5e5e5ee 0,#e5e5e5 3px,currentColor 0) 1px 0/100% 10px repeat-y;
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
}
</style>