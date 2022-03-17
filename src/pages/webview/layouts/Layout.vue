<template>
    <webview-layout :show-sidebar="false"
                  :show-footer="true"
    ></webview-layout>
</template>

<script>
    import Header from "../../components/common/Header.vue";
    import Footer from "../../components/common/Footer.vue";
    import WebviewLayout from "./WebviewLayout.vue";
    export default {
        name: "Layout",
        components: {WebviewLayout, Footer, Header}
    }
</script>

<style lang="scss" scoped>
    .webmypham-layout {
        display: flex;
        // height: 100vh;
        flex-direction: column;
        background-color: #eff2f6;

        .webmypham-main-content {
            flex: auto;
            .webmypham-content {
                /*padding: 20px;*/
                // max-height: calc(100vh - 120px);
                overflow: hidden auto;
                height: 100%;
            }

            .webmypham-footer {
                flex-shrink: 0;
                // height: 60px;
                width: 100%;
                background: #FFFFFF;
            }
            background: #E5E5E5;
        }
    }
</style>