<template>
    <div class="product-detail">
        <div class="product-breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <span>Trang điểm</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>Sữa rửa mặt Vũ Mạnh Dũng</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="product-main">
            <a-row :gutter="16">
                <a-col :span="9">
                    <a-carousel arrows dots-class="slick-dots slick-thumb">
                        <template #customPaging="props">
                        <a>
                            <img :src="getImgUrl(props.i)" />
                        </a>
                        </template>
                        <div v-for="item in 4" :key="item">
                            <img :src="baseUrl + 'abstract0' + item + '.jpg'" />
                        </div>
                    </a-carousel>
                </a-col>
                <a-col :span="10">
                    <div class="main-content">
                        <div class="brand">Thương hiệu</div>
                        <div class="product-name">Tên sản phẩm</div>
                        <div class="status">Tình trạng: <span>còn hàng</span></div>
                        <div class="rating">
                            <a-rate v-model:value="rate" disabled/>
                            <span class="text">(123)</span>
                        </div>
                        <hr width="85%" align="left">
                        <div class="money">
                            <span class="sale">800000</span>
                            <span class="origin"><del>900000</del></span>
                            <span class="precent">10%</span>
                        </div>
                        <div class="save">(Tiết kiệm: <span>100000đ</span>)</div>
                        <div class="quantity">
                            <div class="text">Số lượng:</div>
                            <div class="quantity-toggle">
                                <a-button shape="circle">
                                    <template #icon><minus-outlined /></template>
                                </a-button>
                                <a-input class="input-quantity" v-model:value="quantity"/>
                                <a-button shape="circle">
                                    <template #icon><plus-outlined /></template>
                                </a-button>
                            </div>
                        </div>
                        <div class="add-to-cart"><a-button>Thêm vào giỏ hàng <shopping-cart-outlined /></a-button></div>
                        <div class="payment">
                            <div class="text">Phương thức thanh toán</div>
                            <div class="img">
                                <img width="40" height="40" src="../../../assets/images/vnpay.png" alt="">
                                <img width="60" height="40" src="../../../assets/images/paypal.jpg" alt="">
                                <img width="40" height="40" src="../../../assets/images/momo.png" alt="">
                            </div>
                        </div>
                        <div class="describe">. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa <br>.aaaaaaaaaaaaaaaaaaaaa <br>.aaaaaaaaaaaaaaaaaaaaa</div>
                    </div>
                </a-col>
                <a-col :span="3">
                    <div class="voucher">
                        <a-card title="Voucher">
                            <a-card-grid v-for="test in 4" :key="test" style="width: 100%; text-align: center">
                                <div class="coupon">
                                    <div class="image">
                                        <img width="100" height="50" src="../../../assets/images/coupon.png" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="title">NHẬP MÃ: EGA10</div>
                                        <div class="describe">
                                            Mã Giảm giá 10% cho đơn hàng tối thiểu 100k
                                        </div>
                                        <div class="condition">
                                            <a href="">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </a-card-grid>
                        </a-card>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { HomeOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
const baseUrl =
  'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/';
export default {
    name: "ProductDetail",
    components: {
        HomeOutlined,
        MinusOutlined,
        PlusOutlined,
        ShoppingCartOutlined
    },

    data() {
        return {
            baseUrl,
            quantity: 1,
            rate: 5,
        };
    },

    methods: {
        getImgUrl(i) {
            return `${baseUrl}abstract0${i + 1}.jpg`;
        },
    },
    
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/webview/product-detail.scss";
</style>
<style lang="scss">
.product-detail {
    .ant-card-grid {
        padding: 7px;
    }
    .ant-card-head-title {
        text-align: center !important;
        color: #d82e4d;
        font-weight: bold;
        font-size: 20px;
    }
}
</style>
<style scoped>

    .ant-carousel :deep(.slick-dots) {
        position: relative;
        height: auto;
    }
    .ant-carousel :deep(.slick-slide img) {
        border: 5px solid #fff;
        display: block;
        margin: auto;
        max-width: 80%;
    }
    .ant-carousel :deep(.slick-arrow) {
        display: none !important;
    }
    .ant-carousel :deep(.slick-thumb) {
        bottom: 0px;
    }
    .ant-carousel :deep(.slick-thumb li) {
        width: 60px;
        height: 45px;
    }
    .ant-carousel :deep(.slick-thumb li img) {
        width: 100%;
        height: 100%;
        filter: grayscale(100%);
    }
    .ant-carousel :deep .slick-thumb li.slick-active img {
        filter: grayscale(0%);
    }

</style>
