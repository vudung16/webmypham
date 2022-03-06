<template>
    <div class="info-user">
        <a-tabs v-model:activeKey="activeKey" type="card">
            <a-tab-pane key="1" tab="Tất cả">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="2" tab="Chờ xác nhận">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="3" tab="Chờ lấy hàng">Content of Tab Pane 3</a-tab-pane>
            <a-tab-pane key="4" tab="Đang giao">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane key="5" tab="Đã giao">Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane key="6" tab="Đã hủy">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeKey: '1',
        }
    },
    methods: {
        getCart() {
            console.log(key);
        },
        async getCart() {
            let params = {
                status: this.activeKey
            }
            await this.$store.dispatch('product/getCart', params);
        }
    },
    watch: {
        activeKey: function () {
            this.getCart();
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/webview/info-user.scss";
</style>
<style lang="scss">
.info-user {
    .ant-tabs-nav-scroll {
        text-align: center !important;
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
}
</style>