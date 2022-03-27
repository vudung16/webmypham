<template>
    <div class="order-main-chart">
        <div id="chart">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>
<script>
export default {
    name: "OrderChart",
    props: ['time'],
    data() {
        return {
            series: [{
                name: "Tổng tiền đơn hàng",
                data: []
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 3,
                },
                markers: {
                    size: 4,
                    hover: {
                        size: undefined,
                        sizeOffset: 3,
                    },
                    strokeWidth: [1, 1],
                },
                title: {
                    text: 'Tổng tiền đơn hàng',
                    align: 'left',
                    offsetX: 10,
                    offsetY: 10,
                    margin: 23,
                    style: {
                        fontFamily: "Sarabun",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "22px",
                        color:  '#d82e4d'
                    },
                },
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(value)
                        }
                    }
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                yaxis: {
                    labels: {
                        formatter: (value) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(value),
                    },
                },
                xaxis: {
                    categories: [],
                },
                colors: ['#d82e4d'],
            },
        }
    },
    mounted() {
        this.getDataChart();
    },

    methods: {
        async getDataChart() {
            this.arr = []
            let dataChart = await this.$store.state.admin.responseTime
        
            this.series = [{
                data: dataChart.sum_order
            }];
            dataChart.date.forEach(item => {
                this.arr.push(item)
            })
            this.chartOptions = {
                xaxis: {
                    categories: this.arr
                }
            }
        },
    },
    
    watch: {
        time() {
            this.getDataChart();
        }
    }
}
</script>
<style lang="scss">
.order-main-chart {
    background-color: #ffffff;
    border-radius: 15px;
}
</style>