<template>
    <div class="admin-sidebar" style="width: 256px">
        <!-- <div v-if="!collapsed" class="logo" style="background: #001529;"><img width="200" height="50" src="https://theme.hstatic.net/200000411391/1000799987/14/logo.png?v=209" alt=""></div>
        <div v-else class="logo" style="background: #001529;">logo</div> -->
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button> -->
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <div v-if="!collapsed" class="logo" style="background: #001529;"><img width="200" height="50" src="https://theme.hstatic.net/200000411391/1000799987/14/logo.png?v=209" alt=""></div>
        <div v-else class="logo" style="background: #001529;">logo</div>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Order</span>
      </a-menu-item>
      <a-menu-item key="4">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Slide</span>
      </a-menu-item>
      <a-menu-item key="5">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Product</span>
      </a-menu-item>
      <a-menu-item key="6">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Voucher</span>
      </a-menu-item>
      <a-menu-item key="7">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>User</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="8">Option 5</a-menu-item>
        <a-menu-item key="9">Option 6</a-menu-item>
        <a-menu-item key="10">Option 7</a-menu-item>
        <a-menu-item key="11">Option 8</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
export default {
    name: "Sidebar",
    components: {
        MenuFoldOutlined,
        MenuUnfoldOutlined,
        PieChartOutlined,
        MailOutlined,
        DesktopOutlined,
        InboxOutlined,
        AppstoreOutlined,
    },
    data() {
        return {
            collapsed: false,
            selectedKeys: ['2'],
            openKeys: ['sub1'],
            preOpenKeys: ['sub1'],
        }
    },
    mounted() {
        this.$emitter.on("toggle-sidebar", (collapsed) => {
            this.collapsed = collapsed;
        });
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
            this.openKeys = this.collapsed ? [] : this.preOpenKeys;
        }
    },
    
    watch: {
        openKeys: function(oldValue, newValue) {
            this.preOpenKeys = oldValue;
        }
    }
}
</script>
<style lang="scss">
.admin-sidebar {
    width: auto !important;
    .logo {
        img {
            padding: 9px;
        }
    }
}
</style>