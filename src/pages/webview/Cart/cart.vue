<template>
    <div class="main-cart" v-if="loading == true">
        <div class="header">
            Giỏ hàng
        </div>
        <div class="main">
            <a-row :gutter="16">
                <a-col :span="14">
                    <div class="total-money">
                        Tổng: {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(carts.sum_price) }}
                    </div>
                    <div class="voucher">
                        Mã giảm giá: 
                    </div>
                    <div class="shipping">
                        Phí vận chuyển: {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(shipPrice.total) }}
                    </div>
                    <div class="payment" v-if="!voucher">
                        Thanh toán: {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(carts.sum_price + shipPrice.total) }}
                    </div>
                    <div class="payment" v-else>
                        Thanh toán: 
                    </div>
                    <div class="payment-format">
                        <div class="text">Hình thức thanh toán: </div>
                        <div class="select-payment">
                            <a-radio-group v-model:value="selectPayment">
                                <a-radio-button value="shipcode">
                                    <img width="50" height="50" src="../../../assets/images/shipcode.png" alt="">
                                </a-radio-button>
                                <a-radio-button value="vnpay">
                                    <img width="50" height="50" src="../../../assets/images/vnpay.png" alt="">
                                </a-radio-button>
                                <a-radio-button value="momo">
                                    <img width="50" height="50" src="../../../assets/images/momo.jpg" alt="">
                                </a-radio-button>
                                <a-radio-button value="paypal">
                                    <img width="50" height="50" src="../../../assets/images/paypal.jpg" alt="">
                                </a-radio-button>
                            </a-radio-group>
                        </div>
                    </div>
                </a-col>
                <a-col :span="10">
                    <div class="info-order">Thông tin đặt hàng</div>
                    <div class="info-order-content">
                        <span class="note-text">Bạn cần nhập đầy đủ các thông tin có dấu *</span>
                        <a-input v-model:value="name" placeholder="Họ và tên *">
                            <template #prefix>
                                <user-outlined type="user" />
                            </template>
                        </a-input>
                        <a-input v-model:value="phone" placeholder="Số điện thoại *">
                            <template #prefix>
                                <phone-outlined type="phone" />
                            </template>
                        </a-input>
                        <div class="address">
                            <a-row :gutter="16">
                                <a-col :span="8">
                                    <a-select v-model:value="province">
                                        <a-select-option value="">
                                            Tỉnh/Thành phố *
                                        </a-select-option>
                                        <a-select-option v-for="item in city" :value="item.ProvinceID" :key="item.index">
                                            {{ item.ProvinceName }}
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                                <a-col :span="8">
                                    <a-select v-model:value="huyen">
                                        <a-select-option value="">
                                            Quận/Huyện *
                                        </a-select-option>
                                        <a-select-option v-for="item in district" :value="item.DistrictID" :key="item.index">
                                            {{ item.DistrictName }}
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                                <a-col :span="8">
                                    <a-select v-model:value="phuong">
                                        <a-select-option value="">
                                            Phường/Xã *
                                        </a-select-option>
                                        <a-select-option v-for="item in ward" :value="item.WardCode" :key="item.index">
                                            {{ item.WardName }}
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                            </a-row>
                        </div>
                        <a-input v-model:value="mail" placeholder="Email *">
                            <template #prefix>
                                <mail-outlined type="mail" />
                            </template>
                        </a-input>
                        <a-textarea v-model:value="note" placeholder="Ghi chú" allow-clear />
                        <a-button @click="payment">Xác nhận và đặt hàng</a-button>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
    export default {
        name: "Cart",
        components: {
            UserOutlined, PhoneOutlined, MailOutlined
        },
        data() {
            return {
                city: '',
                district: '',
                ward: '',
                loading: false,
                province: '',
                huyen: '',
                phuong: '',
                service: '',
                shipPrice: '',
                voucher: '',
                name: '',
                phone: '',
                mail: '',
                note: '',
                selectPayment: 'shipcode'
            }
        },

        created() {
            this.getCity();
        },

        computed: {
            carts() {
                let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.cartData))
                
                if (shoppingCart) {
                    return JSON.parse(JSON.stringify(this.$store.state.product.cartData));
                }
            }
        },

        methods: {
            async getCity() {
                this.loading = false;
                let res = await api.getCity();
                this.city = res;
                this.loading = true;
            },

            async getDistrict(params) {
                let res = await api.getDistrict(params);
                this.district = res;
            },

            async getWard(params) {
                let res = await api.getWard(params);
                this.ward = res;
            },

            async getService(params) {
                let res = await api.getService(params);
                this.service = res;
            },

            async shippingOrder(data) {
                let res = await api.shippingOrder(data);
                this.shipPrice = res;
            },

            async payment() {
                if(this.selectPayment === 'shipcode') {
                    this.$router.push('/checkout');
                } else {
                    if(this.selectPayment === 'vnpay') {
                        let params = {
                            total: this.shipPrice.total + this.$store.state.product.cartData.sum_price
                        }
                        let res = await api.payment(params);
                        window.location = res;
                    }
                }
            }

            // city(value) {
            //     console.log(`selected ${value}`);
            // },
        },

        watch: {
            province: function (newValue, oldValue) {
                let params = {
                    province_id: newValue
                }
                this.getDistrict(params);
            },
            huyen: function (newValue, oldValue) {
                let params = {
                    district_id: newValue
                }
                this.getWard(params);
            },
            phuong: function (newValue, oldValue) {
                let params = {
                    shop_id: 2448165,
                    from_district: 3303,
                    to_district: this.huyen,
                }
                this.getService(params);

                let data = {
                    service_id: 53321,
                    insurance_value: this.$store.state.product.cartData.sum_price,
                    coupon: null,
                    from_district_id: 3303,
                    to_district_id: this.huyen,
                    to_ward_code: this.phuong,
                    height:15,
                    length:15,
                    weight:1000,
                    width:15
                }
                this.shippingOrder(data);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/webview/cart.scss";
</style>

<style lang="scss">
.main-cart {
    .address {
        .ant-select {
            width: 100% !important;
        }
        .ant-select-selector {
            border-radius: 15px !important;
        }
        .ant-select-selection-item {
            color: #bdbcbc;
        }
    }
    .ant-input-affix-wrapper {
        border-radius: 15px;
        margin: 10px 0px;
        height: 40px;
    }
    .ant-input-affix-wrapper-textarea-with-clear-btn {
        border-radius: 2px !important;
        height: 80px !important;
    }

    .info-order-content {
        button {
            margin-top: 30px;
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
    .anticon svg {
        color: #bdbcbc !important;
    }

    .ant-radio-button-wrapper {
        height: 100%;
        padding: 0;
        margin-right: 10px;
    }
}
</style>