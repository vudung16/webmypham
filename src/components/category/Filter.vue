<template>
    <div class="category-left">
        <div class="brand">
            <h2>Thương hiệu</h2>
            <a-checkbox-group v-model:value="filter.brand">
                <a-checkbox v-for="item in brand" :key="item.id" :value="item.id">{{ item.name }}</a-checkbox>
            </a-checkbox-group>
            <br />
        </div>
        <hr>
        <div class="total">
            <h2>Mức giá</h2>
            <a-slider range :step="1000000" :default-value="[0, 5000000]" :max="10000000" @change="onChangeTotal" />
        </div>
    </div>
</template>
<script>
import { forEach } from 'lodash';
import api from "../../api/homewebview";
export default {
    data() {
        return {
            brand: '',
            filter: {
                brand: [],
                total: [0, 5000000],
            }
        }
    },
    created() {
        this.getBrand();
    },
    methods: {
        onChangeTotal(value) {
            this.filter.total = value;
        },

        async getBrand() {
            let arr = [];
            let res = await api.getBrand();
            this.brand = res;
            res.forEach(item => {
                arr.push(item.id);
            });
            this.filter.brand = arr;
        }
    },

    watch: {
        filter: {
            handler(val) {
                this.$emit('searchCategory', this.filter);
            },
            deep: true
        }
    }
}
</script>
<style lang="scss">
.category-left {
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

    .ant-checkbox-wrapper+.ant-checkbox-wrapper {
        margin-left: 0px;
    }

    hr {
        width: 80%;
        margin: 0;
    }
}
</style>