<template>
    <div class="main-category">
        <div class="product-breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <span>abc</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>abc</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="voucher">
            <a-card>
                <a-card-grid v-for="item in listVoucher" :key="item.index" style="width: 25%; text-align: center">
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
                    <Category />
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
                    filter: {},
                    arrange: {},
                },
            }
        },

        created() {
            this.vouchers();
        },

        methods: {
            handleCategory(data) {
                let params = JSON.parse(JSON.stringify(data));
                this.dataFilter.filter = params;
                console.log(params);
            },
            async vouchers() {
                let res = await api.listVoucher();
                this.listVoucher = res;
            },
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
    .ant-card-grid {
        padding: 7px;
    }
}
</style>