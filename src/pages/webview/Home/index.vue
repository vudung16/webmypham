<template>
    <div class="home-webview">
        <div class="sidebar">
            <div class="menu-sidebar">
                <a-menu
                    id="dddddd"
                    v-model:openKeys="openKeys"
                    v-model:selectedKeys="selectedKeys"
                    style="width: 256px"
                    mode="inline"
                    @click="handleClick"
                >
                    <a-sub-menu key="sub1" @titleClick="titleClick">
                    <template #icon>
                        <MailOutlined />
                    </template>
                    <template #title>Navigation One</template>
                    <a-menu-item-group key="g1">
                        <template #icon>
                        <QqOutlined />
                        </template>
                        <template #title>Item 1</template>
                        <a-menu-item key="1">Option 1</a-menu-item>
                        <a-menu-item key="2">Option 2</a-menu-item>
                    </a-menu-item-group>
                    <a-menu-item-group key="g2" title="Item 2">
                        <a-menu-item key="3">Option 3</a-menu-item>
                        <a-menu-item key="4">Option 4</a-menu-item>
                    </a-menu-item-group>
                    </a-sub-menu>
                    <a-sub-menu key="sub2" @titleClick="titleClick">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    <template #title>Navigation Two</template>
                    <a-menu-item key="5">Option 5</a-menu-item>
                    <a-menu-item key="6">Option 6</a-menu-item>
                    <a-sub-menu key="sub3" title="Submenu">
                        <a-menu-item key="7">Option 7</a-menu-item>
                        <a-menu-item key="8">Option 8</a-menu-item>
                    </a-sub-menu>
                    </a-sub-menu>
                    <a-sub-menu key="sub4">
                    <template #icon>
                        <SettingOutlined />
                    </template>
                    <template #title>Navigation Three</template>
                    <a-menu-item key="9">Option 9</a-menu-item>
                    <a-menu-item key="10">Option 10</a-menu-item>
                    <a-menu-item key="11">Option 11</a-menu-item>
                    <a-menu-item key="12">Option 12</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/webview/home.scss";
</style>
<style lang="scss">
.home-webview {
    .sidebar {
        .menu-sidebar {
            .ant-menu {
                width: 270px !important;
            }
        }
    }
}
</style>