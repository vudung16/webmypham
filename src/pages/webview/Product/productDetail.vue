<template>
    <div class="product-detail" v-if="isLoading">
        <div class="product-breadcrumb">
            <a-breadcrumb>
                <a-breadcrumb-item href="">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <span>{{ product.category.name }}</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ product.product.product_name }}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="product-main">
            <a-row :gutter="16">
                <a-col :span="20">
                    <a-row :gutter="16">
                        <a-col :span="11">
                            <a-carousel arrows dots-class="slick-dots slick-thumb">
                                <template #customPaging="props">
                                <a>
                                    <img :src="getImgUrl(props.i)" />
                                </a>
                                </template>
                                <div v-for="(item, index) in product.product_image">
                                    <img v-bind:src="getImage(index)" />
                                </div>
                            </a-carousel>
                        </a-col>
                        <a-col :span="13">
                            <div class="main-content">
                                <div class="brand">{{ product.brand }}</div>
                                <div class="product-name">{{product.product.product_name }}</div>
                                <div class="status">Tình trạng: <span>còn hàng</span></div>
                                <div class="rating">
                                    <a-rate v-model:value="rate" disabled/>
                                    <span class="text">(123)</span>
                                </div>
                                <hr width="85%" align="left">
                                <div class="money">
                                    <div v-if="product.product.product_discount">
                                        <span class="sale">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product.product_price - ((product.product.product_discount /100) * product.product.product_price))}}&emsp;</span>
                                        <span class="origin"><del>{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product.product_price)}}</del></span>
                                        <span class="precent">{{ product.product.product_discount}}%</span>
                                    </div>
                                    <div v-else>
                                        <span class="money">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product.product_price)}}</span>
                                    </div>
                                </div>
                                <div class="save" v-if="product.product.product_discount">(Tiết kiệm: <span>{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product.product_price - (product.product.product_price - ((product.product.product_discount /100) * product.product.product_price))) }}</span>)</div>
                                <div class="quantity">
                                    <div class="text">Số lượng:</div>
                                    <div class="quantity-toggle">
                                        <a-button shape="circle" @click="reduction">
                                            <template #icon><minus-outlined /></template>
                                        </a-button>
                                        <a-input class="input-quantity" v-model:value="quantity" disabled/>
                                        <a-button shape="circle" @click="plus">
                                            <template #icon><plus-outlined /></template>
                                        </a-button>
                                    </div>
                                </div>
                                <div class="add-to-cart"><a-button @click="addToCart(product.product.product_id)">Thêm vào giỏ hàng <shopping-cart-outlined /></a-button></div>
                                <div class="payment">
                                    <div class="text">Phương thức thanh toán</div>
                                    <div class="img">
                                        <img width="40" height="40" src="../../../assets/images/vnpay.png" alt="">
                                        <img width="60" height="40" src="../../../assets/images/paypal.jpg" alt="">
                                        <img width="40" height="40" src="../../../assets/images/momo.png" alt="">
                                    </div>
                                </div>
                                <div class="describe">{{ product.product.product_description }}</div>
                            </div>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <div class="info-product">
                            <h2>Thông tin sản phẩm</h2>
                            <div class="product-content" :class="{ active: isActive }" v-html="product.product.product_content"></div>
                            <div class="read-more">
                                <a-button v-if="!isActive" @click="readMore">Xem thêm >></a-button>
                                <a-button v-else @click="readMore">Thu gọn</a-button>
                            </div>
                        </div>
                    </a-row>
                    <a-row :gutter="16">
                        <div class="comment">
                            <h2>Bình luận sản phẩm</h2>
                            <a-comment>
                                <template #actions>
                                    <span key="comment-nested-reply-to">Reply to</span>
                                </template>
                                <template #author>
                                    <a>Han Solo</a>
                                </template>
                                <template #avatar>
                                    <a-avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                </template>
                                <template #content>
                                    <p>
                                        We supply a series of design principles, practical patterns and high quality design
                                        resources (Sketch and Axure).
                                    </p>
                                </template>
                                <a-comment>
                                    <template #actions>
                                        <span>Reply to</span>
                                    </template>
                                    <template #author>
                                        <a>Han Solo</a>
                                    </template>
                                    <template #avatar>
                                        <a-avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                        />
                                    </template>
                                    <template #content>
                                        <p>
                                        We supply a series of design principles, practical patterns and high quality design
                                        resources (Sketch and Axure).
                                        </p>
                                    </template>
                                
                                </a-comment>
                            </a-comment>
                        </div>
                    </a-row>
                </a-col>
                
                <a-col :span="4">
                    <div class="voucher">
                        <a-card title="Voucher">
                            <a-card-grid v-for="item in listVoucher" :key="item.index" style="width: 100%; text-align: center">
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
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { HomeOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
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
            rate: 4,
            product: '',
            isLoading: false,
            isActive: false,
            listVoucher: '',
        };
    },

    created() {
        this.productsDetail();
        this.vouchers();
    },

    methods: {
        getImgUrl(i) {
            return this.product.product_image[i];
        },

        getImage(index) {
            return this.product.product_image[index];
        },

        reduction() {
            if (this.quantity === 1) {
                return false;
            }
            this.quantity --
        },

        plus() {
            this.quantity ++
        },

        async productsDetail() {
            this.isLoading = false;
            let id = this.$route.params.id;
            let res = await api.productDetail({id: id});
            this.product = res;
            this.isLoading = true;
        },

        async vouchers() {
            let res = await api.listVoucher();
            this.listVoucher = res;
        },

        addToCart(id) {
            let params = {
                product_id: id,
                quantity: this.quantity
            };

            this.$store.dispatch('product/cartData', params);
        },

        readMore() {
            if (this.isActive === false) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        }
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

    .ant-input[disabled] {
        color: #000000;
    }

    .ant-rate-star-second {
        color: #7b7b7b;
    }

    .read-more {
        text-align: center;
        margin-top: 20px;
        button {
            border-radius: 15px;
            color: #d82e4d;
            border-color: #d82e4d;
            font-weight: bold;

            &:hover {
                color: #ffffff;
                background-color: #d82e4d;
            }
        }
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

    .slick-slide img {
        height: 400px !important;
    }

</style>
