<template>
    <div class="category-left">
        <div class="brand">
            <h1 v-if="$route.params.id && CategoryProduct.category">{{ CategoryProduct.category.category_name }}</h1>
            <h1 v-else>Tìm kiếm</h1>
            <div class="arrange">
                <div class="text">Sắp xếp:</div>
                <div class="select">
                    <a-menu v-model:selectedKeys="current" mode="horizontal">
                        <a-menu-item key="az">Tên A -> Z</a-menu-item>
                        <a-menu-item key="za">Tên Z -> A </a-menu-item>
                        <a-menu-item key="plus">Giá tăng dần </a-menu-item>
                        <a-menu-item key="reduction">Giá giảm dần </a-menu-item>
                    </a-menu>
                </div>
            </div>
            <div class="category-product">
                <div v-if="CategoryProduct.product && CategoryProduct.product.length === 0" class="product">
                    Không tìm thấy sản phẩm
                </div>
                <div v-else class="product">
                    <a-card>
                        <a-card-grid v-for="product in CategoryProduct.product" :key="product.id"
                            style="width: 25%; text-align: center">

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
                                <img width="30" height="30" src="../../assets/images/add-to-card.png" alt="">
                            </div>
                        </a-card-grid>
                    </a-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: ['az'],
            search: {

            }
        }
    },
    computed: {
        CategoryProduct() {
            let shoppingCart = JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct))
            if (shoppingCart) {
                return JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct));
            }
        }
    },
    methods: {
        redirectProduct(id) {
            this.$router.push('/product/product-detail/' + id);
        },
        addToCart(id) {
            let params = {
                product_id: id,
                quantity: 1
            };

            this.$store.dispatch('product/cartData', params);
            this.$message.success('Thêm vào giỏ hàng thành công');
        },
        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        }
    },

    watch: {
        current: {
            handler(val) {
                this.$emit('searchArrange', this.current);
            },
            deep: true
        }
    }
}
</script>
<style lang="scss" scoped>
.category-left {
    .brand {
        .category-product {
            .product {
                margin: 20px 0px 0px 0px;

                img {
                    width: 100%;
                    height: 200px;
                }

                .money {
                    color: #d82e4d;
                    font-weight: 800;
                }

                .icon-card {
                    display: none;
                    position: absolute;
                    bottom: 25px;
                    right: 30px;
                    cursor: pointer;

                    img {
                        width: 40px !important;
                        height: 40px !important;
                        // position: absolute;
                        // bottom: 135px;
                        // right: 55px;
                        // cursor: pointer;
                    }
                }
            }
        }

        .arrange {
            display: flex;
            align-items: center;

            .text {
                width: 80px;
                font-size: 17px;
            }

            .select {
                width: 100%;

                .ant-menu-overflow {
                    background-color: #ffffff;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.category-left {
    .ant-card-body {
        background-color: #ffffff !important;
    }

    .ant-card-meta-detail {
        padding: 20px 0px;
        text-align: left;
    }

    .ant-card-grid {
        text-align: left !important;
        height: 100%;
        cursor: pointer;
        border: 1px solid rgb(213, 211, 211);
    }

    .ant-card-grid-hoverable:hover .icon-card {
        display: inline !important;
    }

    .ant-card-meta-description>div {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 185px;
        height: 1.2em;
        white-space: nowrap;
    }

    .ant-menu-item-selected {
        color: #d82e4d !important;

        &::after {
            border-bottom: 2px solid #d82e4d !important;
        }
    }
}
</style>