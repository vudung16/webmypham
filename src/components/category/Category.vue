<template>
    <div class="category-left">
        <div class="brand">
            <h1>Trang điểm</h1>
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
                <div class="product">
                    <a-card>
                        <a-card-grid v-for="product in CategoryProduct" :key="product.product_id" style="width: 25%; text-align: center" >
                            
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
                // this.listProduct = JSON.parse(JSON.stringify(this.$store.state.product.categoryProduct))
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
    },

    watch: {
        current: {
            handler(val) {
                this.$emit('searchArrange', this.current);
            },
            deep:true
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

    .ant-card-meta-description > div{
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