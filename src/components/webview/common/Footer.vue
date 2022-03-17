<template>
    <div>
        <a-row>
            <a-col :span="6">
            1 col-order-responsive
            </a-col>
            <a-col :span="6">
            2 col-order-responsive
            </a-col>
            <a-col :span="6">
            3 col-order-responsive
            </a-col>
            <a-col :span="6">
            4 col-order-responsive
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/common/footer.scss";
</style>