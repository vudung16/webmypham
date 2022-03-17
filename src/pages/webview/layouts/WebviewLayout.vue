<template>
    <div class="layout">
        <div class="webmypham-layout">
            <!-- <div class="webmypham-sidebar">
                <Sidebar></Sidebar>
            </div> -->
            <div class="webmypham-main-content">
                <div class="webmypham-header">
                    <Header></Header>
                </div>
                <div class="webmypham-content">
                    <router-view></router-view>
                </div>
                <div class="webmypham-footer">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Sidebar from "../../../components/webview/common/Sidebar.vue";
import Header from "../../../components/webview/common/Header.vue";
import Footer from "../../../components/webview/common/Footer.vue";

export default {
    name: "WebviewLayout",
    components: {Footer, Header},
}
</script>

<style lang="scss" scoped>
    .webmypham-layout {
        display: flex;
        // height: 100vh;

        .webmypham-main-content {
            flex: auto;
            min-width: 1200px;
            .webmypham-header {
                position: relative;
                z-index: 2;
            }
            .webmypham-content {
                /*padding: 20px;*/
                // max-height: calc(100vh - 60px);
                overflow: hidden auto;
                height: 100%;
                background: #ffffff;
            }

            .webmypham-footer {
                flex-shrink: 0;
                // height: 60px;
                width: 100%;
                background: #FFFFFF;
            }
        }
    }
</style>
