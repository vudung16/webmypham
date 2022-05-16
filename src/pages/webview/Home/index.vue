<template>
    <div class="home-webview">
        <div class="sidebar">
            <a-row :gutter="16">
                <a-col :span="14">
                    <div class="banner">
                        <a-carousel autoplay>
                            <div v-for="slide in getSlide" :key="slide.index"><img height="200" v-bind:src="slide"
                                    alt=""></div>
                        </a-carousel>
                    </div>
                </a-col>
                <a-col :span="5">
                    <div class="banner-img">
                        <img src="https://bizweb.dktcdn.net/100/426/076/themes/845228/assets/slider_1.jpg?1642384810061"
                            alt="">
                        <img src="https://bizweb.dktcdn.net/100/426/076/themes/845228/assets/slider_1.jpg?1642384810061"
                            alt="">
                    </div>
                </a-col>
                <a-col :span="5">
                    <div class="banner-img">
                        <img src="https://bizweb.dktcdn.net/100/426/076/themes/845228/assets/slider_1.jpg?1642384810061"
                            alt="">
                        <img src="https://bizweb.dktcdn.net/100/426/076/themes/845228/assets/slider_1.jpg?1642384810061"
                            alt="">
                    </div>
                </a-col>
            </a-row>
        </div>
        <div class="voucher">
            <a-card title="Voucher">
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
            <a-card title="Flash-sale">
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
            <a-card title="Sản phẩm bán chạy">
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
import { AppstoreOutlined, } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
import moment from 'moment';
export default {
    name: "Home",
    components: {
        AppstoreOutlined,
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
        }
    },

    created() {
        this.getProducts();
        this.getSlides();
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
            return moment(date).format('MM/DD/YYYY');
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
}
</style>