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
        <div class="for-you">
            <a-card title="Dành cho bạn">
                <template #extra>
                    <a class="see-all" href="#">
                        <span class="text">Xem tất cả </span>
                        <span class="icon">
                            <svg class="icon-outline" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490.4 490.4" style="enable-background:new 0 0 490.4 490.4;" xml:space="preserve">
                                <path fill="#1890FF" d="M245.2,490.4c135.2,0,245.2-110,245.2-245.2S380.4,0,245.2,0S0,110,0,245.2S110,490.4,245.2,490.4z M245.2,24.5    c121.7,0,220.7,99,220.7,220.7s-99,220.7-220.7,220.7s-220.7-99-220.7-220.7S123.5,24.5,245.2,24.5z"/>
                                <path fill="#1890FF" d="M138.7,257.5h183.4l-48,48c-4.8,4.8-4.8,12.5,0,17.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l68.9-68.9    c4.8-4.8,4.8-12.5,0-17.3l-68.9-68.9c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l48,48H138.7c-6.8,0-12.3,5.5-12.3,12.3    C126.4,252.1,131.9,257.5,138.7,257.5z"/>
                            </svg>
                        </span>
                    </a>
                </template>
                <a-card-grid v-for="product in getProduct" :key="product.product_id" style="width: 20%; text-align: center">
                    
                    <img alt="example" v-bind:src="product.product_image" @click="redirectProduct(product.product_id)"/>
                    
                    <a-card-meta>
                        <template #title>{{product.product_name}}</template>
                        <template #description> <div v-html="product.product_description"></div> </template>
                    </a-card-meta>

                    
                    <div v-if="product.product_discount">
                        <span class="money">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product_price - ((product.product_discount /100) * product.product_price))}}&emsp;</span>
                        <span class="sale"><del>{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product_price)}}</del></span>
                    </div>
                    <div v-else>
                        <span class="money">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(product.product_price)}}</span>
                    </div>

                    <div class="icon-card" @click="addToCart(product.product_id)">
                        <img width="30" height="30" src="../../../assets/images/add-to-card.png" alt="">
                    </div>
                </a-card-grid>
            </a-card>
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
            getProduct: '',
        };
    },

    created() {
        this.productsDetail();
        this.vouchers();
        this.getProducts();
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

        async getProducts() {
            let res = await api.getProduct();
            this.getProduct = res.product.slice(0,5);
        },

        addToCart(id) {
            let params = {
                product_id: id,
                quantity: this.quantity
            };

            this.$store.dispatch('product/cartData', params);
            this.$message.success('Thêm vào giỏ hàng thành công');
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

        .ant-card-meta-description > div{
            text-overflow: ellipsis;
            overflow: hidden; 
            width: 185px; 
            height: 1.2em; 
            white-space: nowrap;
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
