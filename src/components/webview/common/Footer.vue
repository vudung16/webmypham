<template>
    <div>
        <a-row class="footer" align="middle">
            <a-col class="footer-left" :span="12">
                <div>
                    2018 © Copyright - All Rights Reserved. Theme By VCCorp
                </div>
            </a-col>
            <a-col class="footer-right" :span="12">
                <div>
                    Hotline: <b>1900 63 64 65</b>
                </div>
                <div>|</div>
                <div>
                    <a href="#">Hướng dẫn</a>
                </div>
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