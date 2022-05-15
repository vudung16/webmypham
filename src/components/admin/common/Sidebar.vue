<template>
  <div class="admin-sidebar" style="width: 256px; height: 100%">
    <!-- <div v-if="!collapsed" class="logo" style="background: #001529;"><img width="200" height="50" src="https://theme.hstatic.net/200000411391/1000799987/14/logo.png?v=209" alt=""></div>
        <div v-else class="logo" style="background: #001529;">logo</div> -->
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="collapsed" />
      <MenuFoldOutlined v-else />
    </a-button> -->
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline" theme="dark"
      :inline-collapsed="collapsed">
      <a-menu-item key="1">
        <div v-if="!collapsed" class="logo" style="background: #001529;"><img width="200" height="50"
            src="https://theme.hstatic.net/200000411391/1000799987/14/logo.png?v=209" alt=""></div>
        <div v-else class="logo" style="background: #001529;">logo</div>
      </a-menu-item>
      <a-menu-item key="Dashboard">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>Dashboard</span>
      </a-menu-item>
      <a-menu-item key="Order">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Đơn hàng</span>
      </a-menu-item>
      <a-menu-item key="Slide">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Slide</span>
      </a-menu-item>
      <a-menu-item key="Product">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Sản phẩm</span>
      </a-menu-item>
      <a-menu-item key="Voucher">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Voucher</span>
      </a-menu-item>
      <a-menu-item key="User">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Tài khoản</span>
      </a-menu-item>
      <a-menu-item key="Brand">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Thương hiệu</span>
      </a-menu-item>
      <a-menu-item key="Category">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Danh mục</span>
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
    redirectToRouter(name) {
      this.$router.push({ name: name })
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.openKeys = this.collapsed ? [] : this.preOpenKeys;
    }
  },

  watch: {
    selectedKeys: function (oldValue, newValue) {
      this.$router.push({ name: oldValue[0] });
    },
    openKeys: function (oldValue, newValue) {
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

ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-dark,
ul.ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-inline-collapsed.ant-menu-dark {
  height: 100%;
}
</style>