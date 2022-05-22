<template>
    <div>
        <div class="table-order">
            <a-table :columns="columns" :data-source="listOrder" bordered :pagination="false">
                <template #stt="{ record }">
                    {{ record.index }}
                </template>
                <template #code="{ record }">
                    {{ record.code }}
                </template>
                <template #customer="{ record }">
                    {{ record.name }} <br>
                    {{ record.phone }} <br>
                    {{ record.email }}
                </template>
                <template #money="{ record }">
                    {{ formatVND(record.order_total_money) }}
                </template>
                <template #payment="{ record }">
                    <div v-if="record.is_payment === 1">Chưa thanh toán</div>
                    <div v-else>Đã thanh toán</div>
                </template>
                <template #date="{ record }">
                    {{ formatDate(record.order_time) }}
                </template>
                <template #detail="{ record }">
                    <FormOutlined @click="detailOrder(record)" />
                </template>
                <template #footer>
                    <Pagination style="text-align: center" v-if="order.last_page > 1" @paginate="pageOrder"
                        :totalPage="order.last_page" />
                </template>
            </a-table>
        </div>
    </div>
</template>
<script>
const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        slots: { customRender: 'stt' }
    },
    {
        title: 'Mã đơn hàng',
        dataIndex: 'code',
        slots: { customRender: 'code' }
    },
    {
        title: 'Khách hàng',
        dataIndex: 'customer',
        slots: { customRender: 'customer' }
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'money',
        slots: { customRender: 'money' }
    },
    {
        title: 'Tình trạng',
        dataIndex: 'payment',
        slots: { customRender: 'payment' }
    },
    {
        title: 'Ngày đặt',
        dataIndex: 'date',
        slots: { customRender: 'date' }
    },
    {
        title: '',
        dataIndex: 'detail',
        slots: { customRender: 'detail' },
    },
];
import Pagination from '../../../components/admin/common/Pagination.vue';
import { FormOutlined } from '@ant-design/icons-vue';
import moment from 'moment';
export default {
    name: 'TableOrder',
    components: { Pagination, FormOutlined },
    props: ['listOrder', 'tabStatus', 'order'],
    data() {
        return {
            columns,
        }
    },
    mounted() {
        if (this.$route.query && this.$route.query.page) {
            this.current = +this.$route.query.page;
        }
    },
    methods: {
        pageOrder(value) {
            this.$router.push({
                name: 'Order',
                query: { ...this.$route.query, page: value },
            })
        },
        formatVND(data) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data)
        },
        formatDate(date) {
            if (!date || date === null) {
                return ''
            } else {
                return moment(date).format('DD/MM/YYYY');
            }
        },
        detailOrder(record) {
            this.$router.push({
                name: 'OrderDetail',
                query: {
                    order_id: record.id
                }
            })
        }
    },
    watch: {
        $route(to) {
            if (to.query.page) {
                this.current = +to.query.page;
            }
        },
    }
}
</script>
<style lang="scss">
.table-order {
    .anticon-form {
        color: green;
        font-size: 19px;
    }
}
</style>