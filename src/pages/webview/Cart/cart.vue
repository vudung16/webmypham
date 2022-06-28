<template>
    <div class="main-cart" v-if="loading === true">
        <div class="header">
            Giỏ hàng
        </div>
        <div class="empty-cart" v-if="!carts.carts || !carts.carts.length">
            <img src="../../../assets/images/empty-cart.png" alt="">
        </div>
        <div v-else class="main">
            <a-row :gutter="16" style="align-items: center;">
                <a-col :span="15" style="padding-right: 30px; border-right: 1px dashed #c6bdbd;">
                    <div class="table-product">
                        <a-row :gutter="16" class="title-header">
                            <a-col :span="7">Sản phẩm</a-col>
                            <a-col :span="2"></a-col>
                            <a-col :span="5">Đơn giá</a-col>
                            <a-col :span="5">Số lượng</a-col>
                            <a-col :span="4">Số tiền</a-col>
                            <a-col :span="1"></a-col>
                        </a-row>
                        <a-row :gutter="16" v-for="(item, index) in listProduct.carts" :key="item.id"
                            style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                            <a-col :span="7">
                                <div class="product">
                                    <img width="60" height="60" v-bind:src="item.image" alt="">
                                    <div class="product_name">{{ item.name }}</div>
                                </div>
                            </a-col>
                            <a-col :span="2"></a-col>
                            <a-col :span="5">
                                <div class="money">
                                    <div v-if="item.discount">
                                        <span class="sale">{{ new Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(item.price - ((item.discount / 100) *
                                                item.price))
                                        }}&emsp;</span>
                                        <span class="origin"><del>{{ new Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(item.price)
                                        }}</del></span>
                                    </div>
                                    <div v-else>
                                        <span class="money">{{ new Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(item.price)
                                        }}</span>
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="5" class="quantity">
                                <div class="quantity-toggle">
                                    <a-button shape="circle" @click="reduction(item.id, index)">
                                        <template #icon>
                                            <minus-outlined />
                                        </template>
                                    </a-button>
                                    <a-input class="input-quantity" v-model:value="item.quantity" disabled />
                                    <a-button shape="circle" @click="plus(item.id, index)">
                                        <template #icon>
                                            <plus-outlined />
                                        </template>
                                    </a-button>
                                </div>
                            </a-col>
                            <a-col :span="4">
                                <div class="total">
                                    <div v-if="item.discount">
                                        <span class="sale">{{ new Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format((item.price - ((item.discount / 100) * item.price))
                                                * item.quantity)
                                        }}&emsp;</span>
                                    </div>
                                    <div v-else>
                                        <span class="money">{{ new Intl.NumberFormat('de-DE', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(item.price)
                                        }}</span>
                                    </div>
                                </div>
                            </a-col>
                            <a-col :span="1" class="icon-delete">
                                <a @click="deleteProduct(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 30 30" width="25px"
                                        height="25px">
                                        <path
                                            d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
                                    </svg>
                                </a>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="info-payment">
                        <div class="total-money">
                            Tổng: {{ new Intl.NumberFormat('de-DE', {
                                    style: 'currency', currency: 'VND'
                                }).format(carts.sum_price)
                            }}
                        </div>
                        <div class="voucher">
                            Mã giảm giá: - {{ okVoucher.discount_price ? new Intl.NumberFormat('de-DE', {
                                    style:
                                        'currency', currency: 'VND'
                                }).format(okVoucher.discount_price) : '0đ'
                            }}
                            <a-modal v-model:visible="visible" width="600px">
                                <template #title>
                                    <div class="title">
                                        Chọn voucher
                                    </div>
                                    <div class="search">
                                        <div class="text">Mã voucher</div>
                                        <div class="input-search">
                                            <a-input v-model:value="selectVoucher"
                                                placeholder="Nhập mã Voucher cần áp dụng" size="large">
                                            </a-input>
                                            <a-button @click="checkVoucher">Áp dụng</a-button>
                                        </div>
                                    </div>
                                    <div class="message-error" style="margin-top: 20px; text-align: center"
                                        v-if="messageError">
                                        <close-circle-outlined @click="closeError" />
                                        <span style="color: red;">{{ messageError }}</span>
                                    </div>
                                </template>
                                <template #footer>
                                    <a-button key="back" @click="handleCancel">Trở lại</a-button>
                                    <a-button key="submit" type="primary" @click="checkVoucher">Đồng ý</a-button>
                                </template>
                                <a-radio-group v-model:value="selectVoucher">
                                    <a-radio-button :value="item.code" v-for="item in listVoucher" :key="item.index"
                                        :disabled="item.status === false">
                                        <div class="select-voucher">
                                            <img width="100" v-bind:src="item.image" alt="">
                                            <div class="content">
                                                <div class="voucher-code">{{ item.code }}</div>
                                                <div class="describe">{{ item.name }} - Đơn tối thiểu {{ new
                                                        Intl.NumberFormat('de-DE', {
                                                            style: 'currency', currency: 'VND'
                                                        }).format(item.minimum_order)
                                                }}</div>
                                                <div class="end-date">HSD: {{ item.end_date }}</div>
                                                <div class="click-detail">Chi tiết</div>
                                            </div>
                                        </div>
                                    </a-radio-button>
                                </a-radio-group>
                            </a-modal>
                        </div>
                        <div class="shipping">
                            Phí vận chuyển: {{ shipPrice.total ? new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(shipPrice.total) : ''
                            }}
                        </div>
                        <div class="payment" v-if="!okVoucher.discount_price">
                            Thanh toán: {{ shipPrice.total ? new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(carts.sum_price + shipPrice.total) : new
                                    Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(carts.sum_price)
                            }}
                        </div>
                        <div class="payment" v-else>
                            Thanh toán: {{ shipPrice.total ? new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(carts.sum_price - okVoucher.discount_price + shipPrice.total) :
                                    new Intl.NumberFormat('de-DE', {
                                        style: 'currency', currency: 'VND'
                                    }).format(carts.sum_price - okVoucher.discount_price)
                            }}
                        </div>
                        <div class="payment-format">
                            <div class="text">Hình thức thanh toán: {{ selectPayment }}</div>
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
                    </div>
                </a-col>
                <a-col :span="9" style="padding-left: 30px;">
                    <div class="info-order">Thông tin đặt hàng</div>
                    <div class="info-order-content">
                        <span class="note-text">Bạn cần nhập đầy đủ các thông tin có dấu *</span>
                        <div class="text">
                            <a-input v-model:value="name" placeholder="Họ và tên *">
                                <template #prefix>
                                    <user-outlined type="user" />
                                </template>
                            </a-input>
                            <div class="errors" v-if="listErrors.name">{{ listErrors.name[0] }}</div>
                        </div>
                        <div class="text">
                            <a-input v-model:value="phone" placeholder="Số điện thoại *">
                                <template #prefix>
                                    <phone-outlined type="phone" />
                                </template>
                            </a-input>
                            <div class="errors" v-if="listErrors.phone">{{ listErrors.phone[0] }}</div>
                        </div>

                        <div class="text">
                            <div class="address">
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <a-select v-model:value="province">
                                            <a-select-option value="">
                                                Tỉnh/Thành phố *
                                            </a-select-option>
                                            <a-select-option v-for="item in city" :value="item.ProvinceID"
                                                :key="item.index">
                                                {{ item.ProvinceName }}
                                            </a-select-option>
                                        </a-select>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-select v-model:value="huyen">
                                            <a-select-option value="">
                                                Quận/Huyện *
                                            </a-select-option>
                                            <a-select-option v-for="item in district" :value="item.DistrictID"
                                                :key="item.index">
                                                {{ item.DistrictName }}
                                            </a-select-option>
                                        </a-select>
                                    </a-col>
                                    <a-col :span="8">
                                        <a-select v-model:value="phuong">
                                            <a-select-option value="">
                                                Phường/Xã *
                                            </a-select-option>
                                            <a-select-option v-for="item in ward" :value="item.WardCode"
                                                :key="item.index">
                                                {{ item.WardName }}
                                            </a-select-option>
                                        </a-select>
                                    </a-col>
                                </a-row>
                                <div class="errors">
                                    <div v-if="listErrors.province">{{ listErrors.province[0] }}</div>
                                    <div v-if="listErrors.district">{{ listErrors.district[0] }}</div>
                                    <div v-if="listErrors.ward">{{ listErrors.ward[0] }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="text">
                            <a-input v-model:value="mail" placeholder="Email *">
                                <template #prefix>
                                    <mail-outlined type="mail" />
                                </template>
                            </a-input>
                            <div class="errors" v-if="listErrors.email">{{ listErrors.email[0] }}</div>
                        </div>

                        <a-textarea v-model:value="note" placeholder="Ghi chú" allow-clear />
                        <a-button @click="showModal">Chọn hoặc nhập mã giảm giá</a-button><br>
                        <a-button class="btn-submit" @click="payment">Xác nhận và đặt hàng</a-button>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { UserOutlined, PhoneOutlined, MailOutlined, CloseCircleOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import api from "../../../api/homewebview";
import axios from 'axios';
import { cloneDeep } from 'lodash';

export default {
    name: "Cart",
    components: {
        UserOutlined, PhoneOutlined, MailOutlined, CloseCircleOutlined, MinusOutlined, PlusOutlined
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
            name: '',
            phone: '',
            mail: '',
            note: '',
            selectPayment: 'shipcode',
            visible: false,
            listVoucher: {},
            selectVoucher: '',
            okVoucher: {
                discount_price: 0
            },
            messageError: '',
            listProduct: '',
            listErrors: {},
        }
    },

    created() {
        this.loading = false;
        this.getCity();
        this.vouchers();
        this.listProduct = cloneDeep(this.$store.state.product.cartData);
        this.loading = true;
    },

    computed: {
        carts() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.cartData))
            if (shoppingCart) {
                this.listProduct = JSON.parse(JSON.stringify(this.$store.state.product.cartData))
                return JSON.parse(JSON.stringify(this.$store.state.product.cartData));
            }
        }
    },

    methods: {
        async getCity() {
            // this.loading = false;
            let res = await api.getCity();
            this.city = res;
            // this.loading = true;
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
            let params = {
                user_id: this.$store.state.auth.user.id,
                type: this.selectPayment,
                name: this.name,
                phone: this.phone,
                email: this.mail,
                province: this.province,
                district: this.huyen,
                ward: this.phuong,
                total: this.shipPrice.total + this.$store.state.product.cartData.sum_price - this.okVoucher.discount_price,
                pay_ship: this.shipPrice.total,
                voucher_id: this.okVoucher.voucher_id ? this.okVoucher.voucher_id : null,
                note: this.note
            }
            if (this.selectPayment === 'shipcode') {
                let res = await api.payment(params);
                if (res.status === true) {
                    this.$message.success('Đặt hàng thành công');
                    this.$router.push({ name: 'InfoUser' });
                } else {
                    if (res.errors) {
                        this.listErrors = res.errors;
                    } else {
                        this.$message.error(res.message);
                    }
                }
            } else {
                if (this.selectPayment === 'vnpay' || this.selectPayment === 'momo') {
                    let res = await api.payment(params);
                    if (res.status === true) {
                        window.location = res.data;
                    } else {
                        this.listErrors = res.errors;
                    }
                } else {
                    if (this.selectPayment === 'paypal') {
                        this.$message.error('Tính năng đang phát triển');
                        return false;
                    }
                }
            }
        },

        async vouchers() {
            let res = await api.listVoucher();
            this.listVoucher = res;
        },

        deleteProduct(data) {
            let params = {
                type: 'delete',
                quantity: '',
                product_id: data
            }
            this.$store.dispatch('product/cartData', params);
        },
        reduction(product_id, index) {
            if (this.listProduct.carts[index].quantity <= 1) {
                return false;
            } else {
                this.listProduct.carts[index].quantity--
                let params = {
                    type: 'update',
                    quantity: this.listProduct.carts[index].quantity,
                    product_id: product_id
                }
                this.$store.dispatch('product/cartData', params);
                setTimeout(() => this.checkVoucher(), 1500);
                // this.checkVoucher();
            }
        },

        plus(product_id, index) {
            this.listProduct.carts[index].quantity++
            let params = {
                type: 'update',
                quantity: this.listProduct.carts[index].quantity,
                product_id: product_id
            }
            this.$store.dispatch('product/cartData', params);
            setTimeout(() => this.checkVoucher(), 1500);

        },

        // open model
        showModal() {
            this.visible = true;
        },
        handleCancel() {
            this.visible = false;
        },

        closeError() {
            this.messageError = '';
        },

        async checkVoucher() {
            let params = {
                user_id: 1,
                code_voucher: this.selectVoucher,
                price: this.$store.state.product.cartData.sum_price
            };
            let res = await api.checkVoucher(params);
            if (res.status === true) {
                this.okVoucher = res.data;
                this.visible = false;
                this.messageError = '';
            } else {
                this.messageError = res.message;
            }

        }
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

            let params1 = {
                shop_id: 2448165,
                from_district: 3303,
                to_district: this.huyen,
            }
            this.getService(params1);
        },
        phuong: function (newValue, oldValue) {
            let data = {
                service_id: this.service[0].service_id,
                insurance_value: this.$store.state.product.cartData.sum_price,
                coupon: null,
                from_district_id: 3303,
                to_district_id: this.huyen,
                to_ward_code: this.phuong,
                height: 15,
                length: 15,
                weight: 1000,
                width: 15
            }
            this.shippingOrder(data);
        },
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

    .info-order-content {
        .text {
            margin-top: 20px;
        }
    }

    .ant-input-affix-wrapper {
        border-radius: 15px;
        // margin: 10px 0px;
        height: 40px;
    }

    .ant-input-affix-wrapper-textarea-with-clear-btn {
        margin-top: 20px;
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

        .btn-submit {
            width: 100%;
            background-color: #d82e4d;
            color: #ffffff;
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

    .table-product {
        margin: 60px 0px 30px 0px;

        .title-header {
            // text-align: center;
            margin-bottom: 25px;
            font-weight: 800;
        }

        .ant-row {
            align-items: center;
            text-align: center;
        }
    }
}

.ant-modal-header {
    .search {
        display: flex;
        align-items: center;
        margin-top: 20px !important;

        .text {
            margin-right: 20px;
        }

        .input-search {
            width: 80%;
            display: flex;

            button {
                height: 40px;
            }
        }
    }

    .message-error {
        svg {
            color: red !important;
            margin-right: 5px;
            font-size: 14px;
        }
    }
}

.ant-modal-body {
    height: 300px;
    overflow-y: scroll;

    .ant-radio-button-wrapper {
        margin-top: 20px;
        width: 100% !important;
        height: 100% !important;
        padding: 0;
    }

    .select-voucher {
        display: flex;

        .content {
            padding: 0 0 0 10px;
        }
    }
}
</style>