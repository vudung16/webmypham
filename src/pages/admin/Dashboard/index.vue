<template>
    <div class="main-dashboard" id="export-pdf">
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
                            width="15"
                            height="15"
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
                        <a-menu data-html2canvas-ignore="true">
                        <a-menu-item key="1" @click="exportPng">
                            Ảnh PNG
                        </a-menu-item>
                        <a-menu-item key="2" @click="exportPdf">
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
            <Statistical v-if="loading===false" :time="time"/>
        </div>
        <div class="order-chart">
            <OrderChart v-if="loading===false" :time="time"/>
        </div>
        <div class="money-chart">
            <MoneyChart v-if="loading===false" :time="time"/>
        </div>
        <div class="user-chart">
            <UserChart v-if="loading===false" :time="time"/>
        </div>
        <!-- <div class="table-report">
            <TableReport v-if="loading===false"/>
        </div> -->
    </div>
</template>
<script>
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import Statistical from '../../../components/admin/Dashboard/Statistical.vue';
import OrderChart from '../../../components/admin/Dashboard/OrderChart.vue';
import MoneyChart from '../../../components/admin/Dashboard/MoneyChart.vue';
import UserChart from '../../../components/admin/Dashboard/UserChart.vue';
import TableReport from '../../../components/admin/Dashboard/TableReport.vue'; 
import jsPDF from 'jspdf' 
import html2canvas from "html2canvas"
import moment from "moment";
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
            loading: true,
            time: '',
            dates: [],
            index: 0,
        }
    },

    created() {
        this.handleGetTime('week');
    },

    methods: {
        async handleGetTime(time, params) {
            switch (time) {
                case "today":
                this.active = {
                    today: true,
                    yesterday: false,
                    week: false,
                    month: false,
                };
                var today = moment().format("DD-MM-YYYY");
                var yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
                // console.log(yesterday);
                var params = {
                    from: today,
                    to: today,
                };
                break;
                case "yesterday":
                this.active = {
                    today: false,
                    yesterday: true,
                    week: false,
                    month: false,
                };
                var yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
                var beforeYesterday = moment()
                    .subtract(2, "days")
                    .format("DD-MM-YYYY");
                var params = {
                    from: yesterday,
                    to: yesterday,
                };
                break;
                case "week":
                this.active = {
                    today: false,
                    yesterday: false,
                    week: true,
                    month: false,
                };

                var to = moment().format("DD-MM-YYYY");
                var from = moment().subtract(6, "days").format("DD-MM-YYYY");
                var params = {
                    from: from,
                    to: to,
                };
                break;
                case "month":
                this.active = {
                    today: false,
                    yesterday: false,
                    week: false,
                    month: true,
                };

                var to = moment().format("DD-MM-YYYY");
                var from = moment().subtract(29, "days").format("DD-MM-YYYY");
                var params = {
                    from: from,
                    to: to,
                };
                break;

                case "select":
                this.active = {
                    today: false,
                    yesterday: false,
                    week: false,
                    month: false,
                };
                var params = {
                    from: params.from,
                    to: params.to,
                };
                console.log(params);
                break;
            }
            await this.$store.dispatch('admin/responseTime', params);
            this.compareDay(time);
            if (JSON.parse(JSON.stringify(this.$store.state.admin.responseTime))) {
                this.loading = false;
            }
        },

        pickDateRange(value, dateString) {
            if (value != null) {
                this.active = {
                    today: false,
                    yesterday: false,
                    week: false,
                    month: false,
                };
                let params = {
                    from: dateString[0],
                    to: dateString[1],
                };
                let time = "select";
                this.handleGetTime(time, params);
            } else {
                this.handleGetTime("today");
            }
        },

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

        onCalendarChange(val) {
            this.dates = val;
        },

        // xuất png
        exportPng() {
            let elementPng = document.getElementById('export-pdf')
            html2canvas(elementPng)
            .then(canvas => {
                canvas.style.display = 'none'
                document.body.appendChild(canvas)
                return canvas
            })
            .then(canvas => {
                const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                const a = document.createElement('a')
                a.setAttribute('download', 'bao_cao_nhan_vien.png')
                a.setAttribute('href', image)
                a.click()
                canvas.remove()
            })
        },

        // xuất PDF
        exportPdf() {
            var element = document.getElementById('export-pdf');
            html2canvas(element).then(canvas => {
                var imgData = canvas.toDataURL('image/png');
                var imgWidth = 210; 
                var pageHeight = 295;  
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var pdf = new jsPDF('p', 'mm');
                var position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                pdf.save('bao_cao_nhan_vien.pdf');
            });
        },

        compareDay(time) {
            switch (time) {
            case 'today':
                this.time = "hôm qua";
                break;
            case 'yesterday':
                this.time = "hôm kia";
                break;
            case 'week':
                this.time = "tuần trước";
                break;
            case 'month':
                this.time = "tháng trước";
                break;
            case "select":
                this.time = "trước đó" + this.index ++;
                break;

                default: this.time = "hôm qua"
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
                    font-size: 16px;
                    border-bottom: 1px solid transparent;
                }
                .header-times_option span:hover {
                    font-weight:bold;
                    /* font-style: normal; */
                    /* font-weight: bold; */
                    color: #d82e4d;
                    /* width: 120%; */
                    border-bottom: 1px solid #d82e4d;
                }
                .header-times_option .span-active {
                    font-weight:bold;
                    /* font-style: normal; */
                    /* font-weight: bold; */
                    color: #d82e4d;
                    /* width: 120%; */
                    border-bottom: 1px solid #d82e4d;
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
                    label {
                        margin-right: 5px;
                    }
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
                    background: #d82e4d !important;
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
    }
    .span-active {
        font-weight:bold;
        /* font-style: normal; */
        /* font-weight: bold; */
        color: #d82e4d;
        /* width: 120%; */
        border-bottom: 1px solid #d82e4d;
    }
}
</style>