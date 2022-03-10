<template>
    <div class="main-dashboard">
        <div class="statistical-header">
            <div class="header-right">
                <ul class="header-times">
                    <li class="header-times_option">
                    <span
                        :class="active.today ? 'span-active' : ''"
                        title="Hôm nay"
                        @click="handleGetTime('today')"
                        >Hôm nay</span
                    >
                    </li>
                    <li class="header-times_option">
                    <span
                        :class="active.yesterday ? 'span-active' : ''"
                        title="Hôm qua"
                        @click="handleGetTime('yesterday')"
                        >Hôm qua</span
                    >
                    </li>
                    <li class="header-times_option">
                    <span
                        :class="active.week ? 'span-active' : ''"
                        title="7 ngày"
                        @click="handleGetTime('week')"
                        >7 ngày</span
                    >
                    </li>
                    <li class="header-times_option" @click="handleGetTime('month')">
                    <span :class="active.month ? 'span-active' : ''" title="30 ngày"
                        >30 ngày</span
                    >
                    </li>
                    <!-- <li class="header-times_option">Hôm nọ</li> -->
                    <li class="header-times_option-range">
                    <label @click="triggerDatePicker">
                        <span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11 1H12.875C13.4969 1 14 1.50313 14 2.125V12.875C14 13.4953 13.4969 14 12.875 14H1.125C0.503125 14 0 13.4969 0 12.875V2.125C0 1.50313 0.503125 1 1.125 1H3V0.5625C3 0.251563 3.25156 0 3.5625 0C3.87344 0 4.125 0.251563 4.125 0.5625V1H9.875V0.5625C9.875 0.251563 10.1266 0 10.4375 0C10.7484 0 11 0.251563 11 0.5625V1ZM3 2.125H1.125V3.875H12.875V2.125H11V2.4375C11 2.74844 10.7484 3 10.4375 3C10.1266 3 9.875 2.74844 9.875 2.4375V2.125H4.125V2.4375C4.125 2.74844 3.87344 3 3.5625 3C3.25156 3 3 2.74844 3 2.4375V2.125ZM12.875 12.875H1.125V5H12.875V12.875ZM4.5 7H3.5C3.22344 7 3 7.22344 3 7.5C3 7.77656 3.22344 8 3.5 8H4.5C4.77656 8 5 7.77656 5 7.5C5 7.22344 4.77656 7 4.5 7ZM6.5 7H7.5C7.77656 7 8 7.22344 8 7.5C8 7.77656 7.77656 8 7.5 8H6.5C6.22344 8 6 7.77656 6 7.5C6 7.22344 6.22344 7 6.5 7ZM10.5 7H9.5C9.22344 7 9 7.22344 9 7.5C9 7.77656 9.22344 8 9.5 8H10.5C10.7766 8 11 7.77656 11 7.5C11 7.22344 10.7766 7 10.5 7ZM3.5 10.0312H4.5C4.77656 10.0312 5 10.2547 5 10.5312C5 10.8078 4.77656 11.0312 4.5 11.0312H3.5C3.22344 11.0312 3 10.8078 3 10.5312C3 10.2547 3.22344 10.0312 3.5 10.0312ZM7.5 10.0312H6.5C6.22344 10.0312 6 10.2547 6 10.5312C6 10.8078 6.22344 11.0312 6.5 11.0312H7.5C7.77656 11.0312 8 10.8078 8 10.5312C8 10.2547 7.77656 10.0312 7.5 10.0312Z"
                            fill="#5C7AE8"
                            />
                        </svg>
                        </span>
                    </label>
                    <a-range-picker
                        :placeholder="['Bắt Đầu...', 'Kết Thúc...']"
                        @change="pickDateRange"
                        v-model:value="datepicker"
                        ref="datepicker"
                        class="header-times_option-datepicker"
                        :size="'small'"
                        format="DD-MM-YYYY"
                        :allowClear="true"
                        :disabled-date="disabledDate"
                        @calendarChange="onCalendarChange"
                        style="border: none !important"
                        :getPopupContainer="(trigger) => trigger.parentElement"
                    />
                    </li>
                </ul>

                <div class="header-export-report">
                    <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick" data-html2canvas-ignore="true">
                        <a-menu-item key="1" @click="onHandleExportPng">
                            Ảnh PNG
                        </a-menu-item>
                        <a-menu-item key="2" @click="onHandleExportPdf">
                            Tệp PDF
                            <div class="loading" v-if="isLoadingChangePdf">
                            <div class="spinning"></div>
                            </div>
                        </a-menu-item>
                        </a-menu>
                    </template>
                    <a-button class="header-export-report_button">
                        Xuất báo cáo
                    </a-button>
                    </a-dropdown>
                </div>
            </div>
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
            active: {
                today: false,
                yesterday: false,
                week: false,
                month: false,
            },
        }
    },
    methods: {
        formatDate(date) {
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        },

        disabledDate(current) {
            if (!this.dates || this.dates.length === 0) {
                return current && current > moment().endOf("day");
            }

            const diffStart = current.diff(this.dates[0], "days");
            const diffEnd = current.diff(this.dates[1], "days");

            if (diffStart && diffEnd) {
                return (
                Math.abs(diffStart) > 30 ||
                (current > moment().endOf("day") &&
                    current > moment().endOf("day")) ||
                Math.abs(diffEnd) > 30
                );
            }

            if (diffStart) {
                return Math.abs(diffStart) > 30 || current > moment().endOf("day");
            }

            if (diffEnd) {
                return Math.abs(diffEnd) > 30;
            }
        },
    }
    
}
</script>
<style lang="scss">
.main-dashboard {
    padding: 0px 30px;
    .statistical-header {
        margin: 20px 0px;
        .header-right {
            display: flex;
            .header-times {
                flex-grow: 9;
                text-align: right;
                list-style-type: none;
                color: #6b7d95;
                margin-top: 5px;
                .header-times_option {
                    display: inline-block;
                    padding-left: 10px;
                    padding-right: 10px;
                }
                .header-times_option span {
                    cursor: pointer;
                    display:inline-block;
                    text-align:center;
                    font-size: 14px;
                    border-bottom: 1px solid transparent;
                }
                .header-times_option span:hover {
                    font-weight:bold;
                    /* font-style: normal; */
                    /* font-weight: bold; */
                    color: #5c7ae8;
                    /* width: 120%; */
                    border-bottom: 1px solid #5c7ae8;
                }
                .header-times_option .span-active {
                    font-weight:bold;
                    /* font-style: normal; */
                    /* font-weight: bold; */
                    color: #5c7ae8;
                    /* width: 120%; */
                    border-bottom: 1px solid #5c7ae8;
                }
                
                .header-times_option span::before {
                    display: block;
                    content: attr(title);
                    font-weight: bold;
                    height: 0;
                    overflow: hidden;
                    visibility: hidden;
                }
                .header-times_option-range {
                    display: inline-table;
                    text-align: center;
                    margin-left: 10px;
                    margin-right: 10px;
                    cursor: pointer;
                    /* height: 22px; */
                    line-height: 22px;
                }
            }
            .header-export-report {
                flex-grow: 1;
                margin-left: 30px;
                text-align: right;
                .header-export-report_button {
                    color: #ffffff !important;
                    font-style: normal !important;
                    font-weight: normal !important;
                    font-size: 14px !important;
                    background: #5473e7 !important;
                    border-radius: 4px !important;
                }
            }
        }
        .ant-picker:hover, .ant-picker-focused {
            border-color: none !important;
            border-right-width: none !important;
        }
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

    //ant
    span.ant-calendar-picker-input.ant-input.ant-input-sm {
        background: none;
        border: none;
    }
}
</style>