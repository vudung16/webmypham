<template>
    <div class="info-user">
        <div class="user-menu">
            <a-menu v-model:selectedKeys="current" mode="horizontal">
                <a-menu-item key="">
                    Tất cả
                </a-menu-item>
                <a-menu-item key="1">
                    Chờ xác nhận
                </a-menu-item>
                <a-menu-item key="2">
                    Chờ lấy hàng
                </a-menu-item>
                <a-menu-item key="3">
                    Đang giao
                </a-menu-item>
                <a-menu-item key="4">
                    Đã giao
                </a-menu-item>
                <a-menu-item key="5">
                    Đã hủy
                </a-menu-item>
            </a-menu>
        </div>
        <div class="cart">
            <div class="order-cart" v-for="(cart, index) in carts" :key="index" @click="orderDetail(index)">
                <div class="product-order">
                    <a-row :gutter="16" v-for="(item, index) in cart[1]" :key="index" style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                        <a-col :span="16">
                            <div class="product">
                                <img width="80" height="80" v-bind:src="item.product_image" alt="">
                                <div class="product_name">
                                    <p>{{ item.product_name }}</p>
                                    <p>x{{item.quantity}}</p>
                                </div>
                            </div>
                        </a-col>
                        <a-col :span="2"></a-col>
                        <a-col :span="6">
                            <div class="total">
                                <div>
                                    <span class="sale">{{ formatVND(item.detail_amount * item.quantity)}}&emsp;</span>
                                </div>
                            </div>
                        </a-col>
                    </a-row>
                </div>
                <div class="order-total">
                    Tổng số tiền: {{ formatVND(cart[0].order_total_money) }}
                </div>
            </div>
        </div>
        <a-modal v-if="orderDetails" v-model:visible="visible" :title="'Chi tiết đơn hàng: ' + orderDetails[0].code" @ok="okModal">
            <div class="condition">
                <a-row :gutter="16" v-for="(item, index) in orderDetails[1]" :key="index" style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                    <a-col :span="16">
                        <div class="product">
                            <img width="80" height="80" v-bind:src="item.product_image" alt="">
                            <div class="product_name">
                                <p>{{ item.product_name }}</p>
                                <p>x{{item.quantity}}</p>
                            </div>
                        </div>
                    </a-col>
                    <a-col :span="2"></a-col>
                    <a-col :span="6">
                        <div class="total">
                            <div>
                                <span class="sale">{{ formatVND(item.detail_amount * item.quantity)}}&emsp;</span>
                            </div>
                        </div>
                    </a-col>
                </a-row>
                <div class="detail" style="font-size: 16px">
                    <div class="total-product">Tổng tiền hàng: {{ formatVND(orderDetails[1].reduce((accumulator, current) => accumulator + current.detail_amount, 0)) }}</div>
                    <div class="payship">Phí vận chuyển: {{ formatVND(orderDetails[0].pay_ship) }}</div>
                    <div class="voucher" v-if="orderDetails[0].voucher">Giảm giá: - {{ formatVND(orderDetails[0].voucher) }}</div>
                    <div class="order-total">Tổng tiền thanh toán: {{ formatVND(orderDetails[0].order_total_money) }}</div>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            current: [''],
            visible: false,
            orderDetails: '',
            id: 0
        }
    },

    computed: {
        ...mapGetters('auth', [
            'myId',
        ]),
        carts() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.getCart))
            if (shoppingCart) {
                return JSON.parse(JSON.stringify(this.$store.state.product.getCart));
            }
        },
    },
    mounted() {
        this.$emitter.on("user_id", (data) => {
            this.id = data.id
            this.getCart(this.id);
        });
    },
    methods: {
        getCart(id) {
            let params = {
                status: this.current[0],
                user_id: id
            }
            this.$store.dispatch('product/getCart', params);    
        },

        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        },
        
        orderDetail(index) {
            this.orderDetails = this.carts[index];
            this.visible = true;
        },

        okModal() {
            this.visible = false;
        },

        async getUser() {
            await this.$store.dispatch('auth/getMyInfo');
        }
    },
    watch: {
        current: {
            handler (newValue,oldValue) {
                this.getCart(this.id);
            },
            immediate: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/webview/info-user.scss";
</style>
<style lang="scss">
.info-user {
    .user-menu {
        .ant-menu {
            width: 60%;
            margin: 0 auto;
        }
    }
    .ant-tabs-tab-active {
        color: #d82e4d !important;
    }
    .ant-tabs-tab{
        font-weight: 900;
        font-size: 17px;
        &:hover {
            color: #bf445a !important;
        }
    }
    .ant-row {
        width: 100%;
    }
}
</style>