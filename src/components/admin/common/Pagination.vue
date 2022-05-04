<template>
    <div class="pagination">
        <a-pagination v-model:current="current" :total="totalPage * 10" />
    </div>
</template>

<script>
export default {
    props: ['totalPage'],
    data() {
        return {
            current: 1,
        }
    },
    watch: {
        current: {
            handler(val) {
                this.$emit('paginate', this.current);
            },
            deep:true
        }
    }
}
</script>
<style lang="scss">
.pagination {
    margin: 50px 0px 0px 20px;
    .ant-pagination-item {
        border: 1px solid #d82e4d;
        a {
            color: #d82e4d;
        }
    }
}
</style>