<template>
  <div class="user-record">
    <el-row :gutter="15">
      <el-col :span="8">
        <div class="grid-content bg-purple">
            <!-- 订单趋势 -->
            <canvas id="orderTrend"></canvas>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple" id="orderkind">
            <!-- 食品分类 -->
        </div>
       </el-col>
      <el-col :span="8">
          <div class="grid-content bg-purple" id="occation">
            <!-- 预约方式 -->
          </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="9">
        <div class="grid-content bg-purple" id="preference">
            <!-- 用户偏好 -->
        </div>
      </el-col>
      <el-col :span="15">
        <div class="grid-content bg-purple" id="summary">
            <!-- 总结 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { Chart } from 'chart.js'
import { userChartInfo } from '@/network/api'

export default {
  name: 'UserRecord',
  components: {},
  props: {},
  data () {
    return {
      dataTrendList: [],
      dataKindList: [],
      dataPreference: []
    }
  },
  async created () {
    this.getChartInfo()
  },
  async mounted () {
    this.orderKind()
    this.userPreference()
    this.occation()
    this.orderTrend()
    this.toSummary()
  },
  methods: {
    // 得到用户的图表信息
    async getChartInfo () {
      const { chartdatalist } = await userChartInfo({})
      //   console.log(chartdatalist)
      this.dataTrendList = chartdatalist[0].dataTrendList
      //   console.log(this.dataTrendList)
      this.dataKindList = chartdatalist[0].dataKindList
      this.dataPreference = chartdatalist[0].dataPreference
    },
    // 订单趋势
    async orderTrend () {
      await this.getChartInfo()
      const dataLabels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      const dataTrend = this.dataTrendList
      //   console.log(dataTrend)
      const config = {
        type: 'line',
        data: {
          labels: dataLabels,
          datasets: [
            {
              label: '趋势',
              data: dataTrend,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: '订单趋势'
          }
        }
      }
      const ctx = document.getElementById('orderTrend').getContext('2d')
      const chart = new Chart(ctx, config)
      setInterval(() => {
        if (config.data.datasets.length > 0) {
          const last = parseInt(dataLabels[dataLabels.length - 1])
          let label = last + 1
          if (last >= 12) {
            label = 0
          }
          label = label + '月'
          dataLabels.push(label)
          dataTrend.push(this.getRandomNum(0, 1000))
          dataLabels.shift()
          dataTrend.shift()
          chart.update()
        }
      }, 1000)
    },
    // 食品分类
    async orderKind () {
      await this.getChartInfo()
      var orderKind = await echarts.init(document.getElementById('orderkind'))
      orderKind.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '食品分类',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.dataKindList[0], name: '主食' },
              { value: this.dataKindList[1], name: '甜品' },
              { value: this.dataKindList[2], name: '饮品' },
              { value: this.dataKindList[3], name: '副食' },
              { value: this.dataKindList[4], name: '轻食' }
            ]
          }
        ]
      })
    },
    // 预约分类
    async occation () {
      var occation = await echarts.init(document.getElementById('occation'))
      const data = []
      for (let i = 0; i < 2; ++i) {
        data.push(Math.round(Math.random() * 1))
      }
      function run () {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 1)
          } else {
            data[i] += Math.round(Math.random() * 10)
          }
        }
        occation.setOption({
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: ['堂食', '外带'],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 1 // only the largest 3 bars will be displayed
          },
          series: [
            {
              type: 'bar',
              data,
              realtimeSort: true,
              name: '次数',
              label: {
                show: true,
                position: 'right',
                valueAnimation: true
              }
            }
          ],
          legend: {
            show: true
          },
          animationDuration: 0,
          animationDurationUpdate: 2000,
          animationEasing: 'linear',
          animationEasingUpdate: 'linear'
        })
      }
      setTimeout(function () {
        run()
      }, 0)
      setInterval(function () {
        run()
      }, 3000)
    //   occation.setOption({
    //     xAxis: {
    //       type: 'category',
    //       data: ['堂食', '外带']
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [
    //       {
    //         data: [120, 200],
    //         type: 'bar'
    //       }
    //     ]
    //   })
    },
    getRandomNum (min, max) {
      var range = max - min
      var rand = Math.random()
      return (min + Math.round(rand * range))
    },
    // 用户偏好
    async userPreference () {
      await this.getChartInfo()
      var preference = await echarts.init(document.getElementById('preference'))
      preference.setOption({
        egend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: this.dataPreference[0], name: '主食' },
              { value: this.dataPreference[1], name: '甜品' },
              { value: this.dataPreference[2], name: '饮品' },
              { value: this.dataPreference[3], name: '副食' },
              { value: this.dataPreference[4], name: '轻食' }
            ]
          }
        ]
      })
    },
    // 总结
    async toSummary () {
      var summary = await echarts.init(document.getElementById('summary'))
      // prettier-ignore
      const days = [
        'Saturday', 'Friday', 'Thursday',
        'Wednesday', 'Tuesday', 'Monday', 'Sunday'
      ]
      // prettier-ignore
      const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
        .map(function (item) {
          return [item[1], item[0], item[2]]
        })

      summary.setOption({
        legend: {
          data: ['Punch Card'],
          left: 'right'
        },
        tooltip: {
          position: 'top'
        },
        grid: {
          left: 2,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: {
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Punch Card',
            type: 'scatter',
            symbolSize: function (val) {
              return val[2] * 2
            },
            data: data,
            animationDelay: function (idx) {
              return idx * 5
            }
          }
        ]
      })
    }
  }
}
</script>

<style type="text/css" scoped>
.el-row {
    margin-bottom: 0px;
  }
  .el-col {
    height: 270px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 250px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
