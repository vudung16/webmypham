<template>
    <div class="main-dashboard">
        <div class="statistical-header">
            chon thời gian
        </div>
        <div class="statistical-text">
            <Statistical/>
        </div>
        <div class="order-chart">
            <OrderChart/>
        </div>
        <div class="money-chart">
            <MoneyChart/>
        </div>
        <div class="user-chart">
            <UserChart/>
        </div>
        <div class="table-report">
            <TableReport/>
        </div>
    </div>
</template>
<script>
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import Statistical from '../../../components/admin/Dashboard/Statistical.vue'
import OrderChart from '../../../components/admin/Dashboard/OrderChart.vue'
import MoneyChart from '../../../components/admin/Dashboard/MoneyChart.vue'
import UserChart from '../../../components/admin/Dashboard/UserChart.vue'
import TableReport from '../../../components/admin/Dashboard/TableReport.vue'
export default {
    name: "Dashboard",
    components: {
        ArrowUpOutlined,
        ArrowDownOutlined,
        Statistical,
        OrderChart,
        MoneyChart,
        UserChart,
        TableReport
    },
    data() {
        return {
            reload: 0,
        }
    },
    mounted() {
        this.$emitter.on("toggle-sidebar", (isExpanded) => {
            this.reload ++
        });
    }
    
}
</script>
<style lang="scss">
.main-dashboard {
    padding: 0px 30px;
    .statistical-header {
        margin: 20px 0px;
    }
    .statistical-text {
        margin: 20px 0px;
    }
    .order-chart {
        margin: 20px 0px;
    }
    .money-chart {
        margin: 20px 0px;
    }
    .user-chart {
        margin: 20px 0px;
    }
    .table-report {
        margin: 20px 0px;
    }
}
</style>