<template>
    <div class="home-webview">
        <div class="sidebar">
            <a-row :gutter="16">
                <a-col :span="14">
                    <div class="banner">
                        <a-carousel autoplay>
                            <div v-for="slide in getSlide" :key="slide.index"><img height="200" v-bind:src="slide.image"
                                    alt=""></div>
                        </a-carousel>
                    </div>
                </a-col>
                <a-col :span="10">
                    <a-row :gutter="16">
                        <a-col v-for="image in banner" :key="image.id" :span="12">
                            <img style="width:100%; height:150px; padding: 5px 0px" :src="image.image"
                            alt="">
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
        <div class="voucher">
            <a-card>
                <template #title>
                    <div style="text-align: center; align-items: center; display: flex;">
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: right;"></div>
                        <div style="margin: 0px 20px">Voucher</div>
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: left;"></div>
                    </div>
                </template>
                <a-card-grid v-for="(item, index) in listVoucher" :key="index" style="width: 25%; text-align: center">
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
        <div class="flash-sale">
            <a-card>
                <template #title>
                    <div style="text-align: center; align-items: center; display: flex;">
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: right;"></div>
                        <div style="margin: 0px 20px">Flash-sale</div>
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: left;"></div>
                    </div>
                </template>
                <a-card-grid v-for="product in productDiscount" :key="product.index"
                    style="width: 20%; text-align: center">
                    <a-badge :count="product.discount + '%'">
                        <img alt="example" v-bind:src="product.image" @click="redirectProduct(product.id)" />
                    </a-badge>

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
        <div class="selling">
            <a-card>
                <template #title>
                    <div style="text-align: center; align-items: center; display: flex;">
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: right;"></div>
                        <div style="margin: 0px 20px">Sản phẩm bán chạy</div>
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: left;"></div>
                    </div>
                </template>
                <a-card-grid v-for="product in productSelling" :key="product.id" style="width: 20%; text-align: center">

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
        <div class="for-you">
            <a-card>
                <template #title>
                    <div style="text-align: center; align-items: center; display: flex;">
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: right;"></div>
                        <div style="margin: 0px 20px">Dành cho bạn</div>
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: left;"></div>
                    </div>
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
        <div class="brand">
            <a-card>
                <template #title>
                    <div style="text-align: center; align-items: center; display: flex;">
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: right;"></div>
                        <div style="margin: 0px 20px">Thương hiệu</div>
                        <div style="width: 100%"><hr style="border: 1px solid #bd7c7c; width: 70%; float: left;"></div>
                    </div>
                </template>
                <carousel :items-to-show="2" :wrap-around="true">
                    <slide style="padding: 0px 10px" v-for="item in brand" :key="item">
                    <img style="width:100%" :src="item.image" alt="">
                    </slide>

                    <template #addons>
                    <navigation />
                    </template>
                </carousel>
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
import { AppstoreOutlined, } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import moment from 'moment';
export default {
    name: "Home",
    components: {
        AppstoreOutlined,
        Carousel,
        Slide,
        Navigation,
    },
    data() {
        return {
            getProduct: '',
            getSlide: '',
            banner: '',
            productDiscount: '',
            productSelling: '',
            listVoucher: '',
            visible: false,
            voucher: '',
            brand: '',
        }
    },

    created() {
        this.getProducts();
        this.getSlides();
        this.getBrands();
        this.productsDiscount();
        this.productsSelling();
        this.vouchers();
    },

    methods: {
        async getProducts() {
            let res = await api.getProduct();
            this.getProduct = res.product;
        },

        async getSlides() {
            let res = await api.getSlide();
            this.getSlide = res.slide;
            this.banner = res.banner;
        },

        async getBrands() {
            let res = await api.getBrand();
            this.brand = res;
        },

        async productsDiscount() {
            let res = await api.productsDiscount();
            this.productDiscount = res.productDiscount;
        },

        async productsSelling() {
            let res = await api.productsSelling();
            this.productSelling = res.productSelling;
        },

        async vouchers() {
            let res = await api.listVoucher();
            this.listVoucher = res;
        },

        redirectProduct(id) {
            this.$router.push('/product/product-detail/' + id);
        },
        addToCart(id) {
            if (this.$store.state.auth.user) {
                let params = {
                    product_id: id,
                    quantity: 1
                };

                this.$store.dispatch('product/cartData', params);
                this.$message.success('Thêm vào giỏ hàng thành công');
            } else {
                this.$message.error('Bạn chưa đăng nhập');
            }
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
    }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/webview/home.scss";
</style>
<style lang="scss">
.home-webview {
    .sidebar {
        .menu-sidebar {
            .ant-menu {
                width: 270px !important;
            }
        }

        .banner {
            padding-top: 5px;

            .ant-carousel :deep(.slick-slide) {
                text-align: center;
                height: 160px;
                line-height: 160px;
                background: #364d79;
                overflow: hidden;
            }

            .ant-carousel :deep(.slick-slide h3) {
                color: #fff;
            }

            img {
                height: 290px !important;
                width: 100%;
            }
        }

        .banner-img {
            img {
                padding: 5px 0px;
                width: 100%;
                height: 150px;
            }
        }
    }

    // .voucher {
    //     .ant-card-grid {}
    // }
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

    .ant-badge {
        width: 100%;
    }
    .ant-card-head {
        border-bottom: none !important;
    }
    .carousel__next, .carousel__prev {
        background: #cf7575;
    }
}
</style>