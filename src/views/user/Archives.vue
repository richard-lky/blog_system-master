<template>
    <div id="Archives" class="top">
        <el-backtop target=".top" :bottom="200"></el-backtop>
        <nav-bar></nav-bar>
        <div class="headline">流年记</div>
        <div class="archives_container">
            <!-- <div class="aside_content">
                <div class="aside_avater">
                    <div class="card_content">
                        <div class="card_info">
                            <img src="../../assets/img/bg_lake.jpg" alt="">
                            <div class="author_info">作者名字</div>
                            <div class="author_description">业精于勤，行成于思。</div>
                        </div>
                        <div class="card_announcement">
                            
                        </div>
                    </div>
                </div>
                <br>
                <div class="aside_avater">
                    <div class="card_announcement">
                        <div class="card_headline"><i class="el-icon-message-solid"></i>公告</div>
                        <p>欢迎欢迎</p>
                        <img src="../../assets/img/announce.gif" alt="">
                    </div>
                </div>
            </div> -->
            <Aside></Aside>
            <div class="archives_content">
                <div class="archives_charts">
                    <div class="charts_title">文章发布统计图</div>
                    <div id="myChart"  class="chart_data"></div>
                </div>
                <div class="archives_article">
                    <div class="timeline-small">
                        <div class="timeline-small-body">
                            <ul>
                                <li>
                                    <div class="bullet_title blue"></div>
                                    <div class="bullet_headline">文章总览 - {{total}}</div>
                                </li>
                                <li v-for="item in articleData" :key="item.id">
                                    <div class="bullet blue"></div>
                                    <div class="article_item_img"><a href="#"><img :src="$baseImgUrl + item.picture" alt=""></a></div>
                                    <div class="desc">
                                        <h2><li class="el-icon-date"></li> {{item.createTime}}</h2>
                                        <h3><a href="#">{{item.articleSummary}}</a></h3>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="m_page">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue"
import Aside from "../../components/Aside.vue"
// import echarts from 'echarts'
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 以下的组件按需引入
require('echarts/lib/component/tooltip')   // tooltip组件
require('echarts/lib/component/title')   //  title组件
require('echarts/lib/component/legend')  // legend组件
export default {
    name: "Archives",
    components: {
        NavBar,
        Aside,
    },
    data() {
        return {
            articleData: [], // 文章列表
            monthData: [],
            articleCount: [],
            currentPage: 1,
            pageSize: 5,
            total: 8,
        }
    },
    created() {
        const that = this;
        this.$axios.get('/article/articleShow', {
            params: {
                page: this.currentPage,
                rows: this.pageSize
            }
        })
        .then(function (response) {
            // console.log("+++++++"+response.data.data);
            that.articleData = response.data.data;
            // that.monthData = response.data.data.
            that.total = response.data.total;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.$axios.get('/article/showMonthArticleCount')
        .then(function (response) {
            console.log("66666",response.data.data);
            that.monthData = response.data.data.map(that.month);
            that.articleCount = response.data.data.map(that.count);
            console.log("+++++++",that.monthData);
            // that.articleCount = response.data.data.count;
            // that.monthData = response.data.data.
            // that.total = response.data.total;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
    month(num){
        return num.month;
    },
    count(num){
        return num.count;
    },
        //   图表
    drawLine() {
        // 基于准备好的dom，初始化echarts实例
        const that = this;
        let myChart = echarts.init(document.getElementById('myChart'))
        console.log(that.monthData,"****///--")
        // 绘制图表
        myChart.setOption({
            xAxis: {
                type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                data: this.monthData,   // x轴数据
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
                data: this.articleCount,
                type: 'line'
            }
            ]
        });
        }
    },
    mounted () {
    /*ECharts图表*/
    this.drawLine();
  },
}
</script>
<style scoped>
#Archives {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/sky.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.headline {
   width: 100%;
   height: 300px;
   font-size: 40px;
   line-height: 300px;
   text-align: center;
   vertical-align: middle;
   font-family: arzhu;
   color: #fff;
   font-weight: bold;
}
.archives_container {
    width: 92%;
    margin: 5px auto 30px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
}
.archives_content {
    width: 75%;
    display: inline-block;
    background: #fff;
    padding: 50px 40px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.chart_data {
    width: 100%;
    height: 300px;
}
.charts_title {
    font-size: 20px;
    font-weight: 600;
}
.archives_article {
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
}
.timeline-small {
    overflow: hidden;
    margin: 30px auto 0;
}
.timeline-small-body ul {
    padding: 1em 0 0 2em;
    margin: 0;
    list-style: none;
    position: relative;
}
.timeline-small-body ul::before {
    content: ' ';
    height: 100%;
    width: 1px;
    background-color: #aadafa;
    position: absolute;
    top: 0;
    left: 2.4em;
    z-index: -1;
}
.timeline-small-body li {
    margin-left: 2px;
    text-align: left;
}
.timeline-small-body li :hover {
    border-color: #ff7242;
}
.timeline-small-body li div {
    display: inline-block;
    margin: 1em 0;
    vertical-align: top;
}
.timeline-small-body .bullet_title {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #fff;
    border: 5px solid #49b1f5;
    position: relative;
    top: 4px;
    left: -5.5px;
}
.bullet_headline {
    font-size: 18px;
    font-weight: 600;
}
.timeline-small-body .bullet {
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #fff;
    z-index: 1;
    margin-right: 1rem;
    margin-top: 50px;
}
.timeline-small-body .bullet.blue :hover {
    border: 3px solid #ff7242;
}
.timeline-small-body .bullet.blue {
    border: 3px solid #49b1f5;
}
.timeline-small-body .article_item_img {
    width: 80px;
    height: 80px;
    font-size: 0.75em;
    padding-top: 0.40rem;
    padding-right: 2rem;
    margin-right: 20px;
    overflow: hidden;
}
.timeline-small-body .article_item_img img {
    width: 80px;
    height: 80px;
    transition:all .6s;
    object-fit: cover;
}
.timeline-small-body .article_item_img img:hover {
    transform: scale(1.1);
}
.timeline-small-body .desc {
    width: 65%;
    min-width: 234px;
}
.timeline-small-body h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0 0 ;
    transition: all .6s; 
}
.timeline-small-body h3 a {
    color: rgba(0, 0, 0, 0.664);
}
.timeline-small-body h3:hover {
    color: #49b1f5;
    transform: translateX(20px);
}
.timeline-small-body h3 a:hover {
    color: #49b1f5;
}
.timeline-small-body h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #808080;
}
.m_page {
  background: #fff;
  border-radius: 5px;
  width: 92%;
  margin: 30px auto 0;
  padding: 10px;
  opacity: 0.9;
}
</style>