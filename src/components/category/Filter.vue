<template>
    <div class="category-left">
        <div class="brand">
            <h2>Thương hiệu</h2>
            <a-checkbox-group
                v-model:value="filter.brand"
                name="checkboxgroup"
                :options="category"
            />
            <br />
        </div>
        <hr>
        <div class="total">
            <h2>Mức giá</h2>
            <a-slider
                range
                :step="1000000"
                :default-value="[2000000, 5000000]"
                :max="10000000"
                @change="onChangeTotal"
            />
        </div>
    </div>
</template>
<script>
import { forEach } from 'lodash';
import api from "../../api/homewebview";
export default {
    data() {
        return {
            category: '',
            filter: {
                brand: [],
                total: '',
            }
        }
    },
    created() {
        this.getCategory();
    },
    methods: {
        onChangeTotal(value) {
            this.filter.total = value;
        },

        async getCategory() {
            let arr = [];
            let res = await api.getCategory();
            res.forEach(item => {
                arr.push(item.category_name);
            })
            this.category = arr;
        }
    },

    watch: {
        filter: {
            handler(val) {
                this.$emit('searchCategory', this.filter);
            },
            deep:true
        }
    }
}
</script>
<style lang="scss">
.category-left{
    .brand {
        margin-bottom: 35px;
    }
    .total {
        margin-top: 30px;
        h2 {
            margin-bottom: 30px;
        }
    }
    .ant-checkbox-wrapper {
        display: block;
    }
    hr {
        width: 80%;
        margin: 0;
    }
}
</style>