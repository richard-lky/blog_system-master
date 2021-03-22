<template>
  <div :class="{ 'content-box': true }">
    <div class="content">
      <div class="archives_charts">
          <div class="charts_title">文章发布统计图</div>
          <div id="myChart"  class="chart_data"></div>
          <div id="pieReport" class="chart_data"></div>
      </div>
      <!-- 公告显示 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最新公告</span>
        </div>
        <div class="new">{{ getNewNotice.noticeContent }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  getNewNotice,
} from "../../network/history";
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 以下的组件按需引入
require('echarts/lib/component/tooltip')   // tooltip组件
require('echarts/lib/component/title')   //  title组件
require('echarts/lib/component/legend')  // legend组件
export default {
  name: "Home",
  data() {
    return {
      getNewNotice: {
        noticeContent: "",
      },
      x_date: ['2021-01','2021-02','2021-03',   // x轴数据
      '2021-04', '2021-05','2021-06', '2021-07',
      '2021-08', '2021-09','2021-010', '2021-11','2021-012'
      ], 
      date: [1, 4, 6, 1, 7, 0, 13,0,0,0,0,0],  
      opinion: ["分类1", "分类2"],
      opinionData: [
        { value: 12, name: "分类1", itemStyle: "#1ab394" },
        { value: 18, name: "分类2", itemStyle: "#79d2c0" }
      ],
      
    };
  },
  methods: {
    //折线图表
    drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                data: this.x_date,
                axisLine: {
                // 坐标轴轴线相关设置。
                lineStyle: {
                color: 'rgba(0,0,0,.6)'
                }
          }
            },
            yAxis: {
                type: 'value',
                scale: true,
                splitNumber: 4, // y轴的间隔数
                axisLine: {
                // 坐标轴轴线相关设置。
                lineStyle: {
                color: 'rgba(0,0,0,.6)'
                }
          }
            },
            // 刻度线
            axisTick: {
            show: false,
            alignWithLabel: true
            },
            tooltip: {
                trigger: 'axis'   // axis   item   none三个值
            },
            series: [
            {
                name: '文章篇数：',
                data: this.date,
                type: 'line'
            }
            ]
        });
      },
      //饼图
      drawPie(id) {
      this.charts = this.$echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        legend: {
          bottom: 10,
          left: "center",
          data: this.opinion
        },
        series: [
          {
            name: "状态",
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              color: function(params) {
                //自定义颜色
                var colorList = ["#1ab394", "#79d2c0"];
                return colorList[params.dataIndex];
              }
            },
            data: this.opinionData
          }
        ]
      });
    },
    },
    mounted () {
    /*ECharts图表*/
    this.$nextTick(function() {
      this.drawPie("pieReport");
      this.drawLine();
    });
  },
  created() {
    getNewNotice().then((res) => {
      console.log(res);
      
      // this.getNewNotice.noticeContent = res.noticeContent;
    });
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
  background: #f0f0f0;
}
.container .content-box {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 5px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
}
.content-box .content {
  height: 100%;
  padding: 10px 30px;
}
.content-box .content .box-card {
  margin: 0 7% 0 6%;
  height: 200px;
}
.content-box .content .box-card .new {
  margin: 15px 30px;
}
.chart_data {
    width: 50%;
    height: 300px;
    display: inline-block;
}
.charts_title {
  text-align: center;
    font-size: 20px;
    font-weight: 600;
}
</style>