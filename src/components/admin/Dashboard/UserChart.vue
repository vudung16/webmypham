<template>
    <div class="order-main-chart">
        <div id="chart">
            <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>
<script>
export default {
    name: "UserChart",
    props: ['time'],
    data() {
        return {
            series: [{
                name: 'Tổng đánh giá',
                data: [31, 40, 28, 51, 42]
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false,
                    },
                },
                title: {
                    text: 'Tổng số lượt đánh giá sản phẩm',
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
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    categories: ['1 sao', '2 sao', '3 sao', '4 sao', '5 sao']
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
                data: dataChart.rate_value
            }];
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