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
    data() {
        return {
            series: [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                    text: 'Tổng số đơn hàng',
                    align: 'left',
                    offsetX: 10,
                    offsetY: 10,
                    margin: 23,
                    style: {
                        fontFamily: "Sarabun",
                        fontWeight: "bold",
                        fontSize: "16px",
                        lineHeight: "22px",
                    },
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                },
                legend: {
                    labels: { colors: "#6B7D95" },
                    position: "top",
                    horizontalAlign: "right",
                    floating: true,
                    offsetY: -25,
                    offsetX: -5,
                    fontSize: "12px",
                    fontWeight: "600",
                    lineHeight: "16px",
                    colors: "#6B7D95",
                    fontFamily: "Sarabun",
                },
            },
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