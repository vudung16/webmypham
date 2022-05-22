<template>
    <div>
        <div class="header" v-if="dataOrder.order">
            <Breadcrums :title="'Chi tiết đơn hàng: ' + dataOrder.order.code">
                <template #action>
                    <a-space>
                        <a-button v-if="dataOrder.order.action === 1" type="primary" size="large" @click="cancelOrder">
                            Hủy đơn hàng
                        </a-button>
                        <a-button type="primary" size="large" @click="updateOrder(dataOrder.order.action)">
                            {{ textUpdate(dataOrder.order.action) }}
                        </a-button>
                    </a-space>
                </template>
            </Breadcrums>
        </div>
        <div class="order-main" v-if="dataOrder">
            <a-row :gutter="16">
                <a-col :span="15" style="padding-right: 30px; border-right: 1px dashed #c6bdbd;">
                    <h3>Danh sách sản phẩm</h3>
                    <div class="table-product">
                        <a-row :gutter="16" class="title-header">
                            <a-col :span="8">Sản phẩm</a-col>
                            <a-col :span="2"></a-col>
                            <a-col :span="5">Đơn giá</a-col>
                            <a-col :span="5">Số lượng</a-col>
                            <a-col :span="4">Số tiền</a-col>
                        </a-row>
                        <a-row :gutter="16" v-for="(item, index) in dataOrder.orderDetail" :key="index"
                            style="padding: 5px 0px; border-bottom: 1px solid #c6bdbd; ">
                            <a-col :span="8">
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
                                    x {{ item.quantity }}
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
                        </a-row>
                    </div>
                    <div class="info-payment" v-if="dataOrder.order">
                        <div class="total-money" v-if="dataOrder.sum_price">
                            Tổng: {{ new Intl.NumberFormat('de-DE', {
                                    style: 'currency', currency: 'VND'
                                }).format(dataOrder.sum_price)
                            }}
                        </div>
                        <div class="voucher" v-if="dataOrder.voucher">
                            Mã giảm giá: - {{ dataOrder.discount_price ? new Intl.NumberFormat('de-DE', {
                                    style:
                                        'currency', currency: 'VND'
                                }).format(dataOrder.discount_price) : '0đ'
                            }}
                        </div>
                        <div class="shipping">
                            Phí vận chuyển: {{ dataOrder.order.pay_ship ? new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(dataOrder.order.pay_ship) : ''
                            }}
                        </div>
                        <div class="payment">
                            Thanh toán: {{ new Intl.NumberFormat('de-DE', {
                                    style: 'currency',
                                    currency: 'VND'
                                }).format(dataOrder.order.order_total_money)
                            }} - {{ dataOrder.order.is_payment === 1 ? 'Chưa thanh toán' : 'Đã thanh toán' }}
                        </div>
                    </div>
                </a-col>
                <a-col :span="9" style="padding-left: 30px;" v-if="dataOrder.profile">
                    <h3>Thông tin đặt hàng</h3>
                    <div class="info-order-content">
                        <div class="text">
                            <div class="title">Họ tên</div>
                            <a-input disabled v-model:value="dataOrder.profile.name" placeholder="Họ và tên *">
                            </a-input>
                        </div>
                        <div class="text">
                            <div class="title">Số điện thoại</div>
                            <a-input disabled v-model:value="dataOrder.profile.phone" placeholder="Số điện thoại *">
                            </a-input>
                        </div>

                        <div class="text">
                            <div class="address">
                                <div>Địa chỉ</div>
                                <a-row :gutter="16">
                                    <a-col :span="8">
                                        <a-select disabled v-model:value="dataOrder.profile.province_id">
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
                                        <a-select disabled v-model:value="dataOrder.profile.district_id">
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
                                        <a-select disabled v-model:value="dataOrder.profile.ward_id">
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
                            </div>
                        </div>

                        <div class="text">
                            <div class="title">Email</div>
                            <a-input disabled v-model:value="dataOrder.profile.email" placeholder="Email *"></a-input>
                        </div>
                        <div class="text">
                            <div class="title">Ghi chú</div>
                            <a-textarea disabled v-model:value="dataOrder.profile.note" placeholder="Ghi chú"
                                allow-clear />
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import apiAdmin from '../../../api/admin';
import api from '../../../api/homewebview';
export default {
    name: 'OrderDetail',
    data() {
        return {
            dataOrder: {},
            city: [],
            district: [],
            ward: [],
        }
    },
    created() {
        this.getOrder();
        this.getCity();
    },
    methods: {
        async getOrder() {
            let params = {
                id: this.$route.query.order_id
            };
            let res = await apiAdmin.getOrder(params);
            if (res.status === true) {
                console.log(res.data);
                this.dataOrder = res.data;
            } else {
                this.$message.error('Có lỗi xảy ra');
            }
        },
        async updateOrder(action) {
            let params = {
                id: this.dataOrder.order.id,
                action: action
            };
            let res = await apiAdmin.changeAction(params);
            if (res.status === true) {
                this.$router.push({
                    name: 'Order',
                    query: { status: res.data.status },
                })
            } else {
                this.$message.error('Có lỗi xảy ra');
            }
        },
        async cancelOrder() {
            let params = {
                id: this.dataOrder.order.id,
            };
            let res = await apiAdmin.cancelOrder(params);
            if (res.status === true) {
                this.$router.push({
                    name: 'Order',
                    query: { status: 'order_cancel' },
                })
            } else {
                this.$message.error('Có lỗi xảy ra');
            }
        },
        async getCity() {
            let res = await api.getCity();
            this.city = res;
        },

        async getDistrict(params) {
            console.log(this.dataOrder);
            let res = await api.getDistrict(params);
            this.district = res;
        },

        async getWard(params) {
            let res = await api.getWard(params);
            this.ward = res;
        },
        textUpdate(value) {
            if (value == 1) {
                return 'Chuyển đơn hàng sang chờ xử lý';
            }
            if (value == 2) {
                return 'Chuyển đơn hàng sang đang giao hàng';
            }
            if (value == 3) {
                return 'Chuyển đơn hàng sang đã giao';
            }
        }
    },
    watch: {
        'dataOrder.profile.province_id': {
            handler: function (newValue, oldValue) {
                let params = {
                    province_id: newValue
                }
                this.getDistrict(params);
            },
            deep: true,
            immediate: true
        },
        'dataOrder.profile.district_id': {
            handler: function (newValue, oldValue) {
                let params = {
                    district_id: newValue
                }
                this.getWard(params);
            },
            deep: true,
            immediate: true
        },
    }
}
</script>
<style lang="scss">
.order-main {
    padding: 20px 50px;

    h3 {
        text-align: center;
        margin-bottom: 50px;
    }

    .table-product {
        margin: 0px 0px 30px 0px;

        .product {
            display: flex;
            align-items: center;

            img {
                margin-right: 10px;
            }
        }

        .money {
            margin-top: 15px;

            .sale {
                color: #d82e4d;
                font-size: 16px;
                margin: 3px 17px 0px 0px;
            }

            .origin {
                color: #747071;
                font-size: 14px;
                margin-right: 20px;
            }
        }

        .total {
            .sale {
                color: #d82e4d;
                font-size: 18px;
            }
        }

        .quantity {
            display: flex;

            .quantity-toggle {
                margin: 0 auto;

                .input-quantity {
                    width: 50px;
                    background-color: #ffffff;
                    border: none;
                    text-align: center;
                }
            }
        }

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

    .info-order-content {
        .text {
            margin-bottom: 20px;
        }
    }

    .ant-select {
        width: 100% !important;
    }

    .ant-select-selector {
        border-radius: 15px !important;
    }

    .ant-select-selection-item {
        color: #bdbcbc;
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
}
</style>