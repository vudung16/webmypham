<template>
    <div class="count-order">
      <div id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
</template>
<script>
export default {
    name: "MoneyChart",
    props: ['time'],
    data() {
        return {
            series: [{
            name: 'Số đơn hàng trong ngày',
            data: []
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'bar',
              zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false,
                },
            },
            title: {
                text: 'Số đơn hàng trong ngày',
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
            plotOptions: {
              bar: {
                borderRadius: 10,
                columnWidth: '10%',
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: 2
            },
            
            grid: {
              row: {
                colors: ['#fff', '#f2f2f2']
              }
            },
            xaxis: {
              labels: {
                rotate: -45
              },
              categories: [],
              tickPlacement: 'on'
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
                data: dataChart.order_count
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
.count-order {
    background-color: #ffffff;
    border-radius: 15px;
}
</style>