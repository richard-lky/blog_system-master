<template>
    <div id="backgroundImg" class="top">
      <el-backtop target=".top" :bottom="200"></el-backtop>
      <div>
          <nav-bar></nav-bar>
      </div>
      <div class="headline">分类</div>
      <div class="container">
        <Aside></Aside>
        <div class="category_container">
          <div class="m_opacity m_title">
              <div class="m_tag" v-for="item in categoryData" :key="item.id">
                  <div class="m_tag_item">
                      <a href="#" class="m_tag_name">{{item.categoryName}}</a>
                      <div class="m_tag_number">{{item.count}}</div>
                  </div>
              </div>
          </div>
          <div class="m_new">
          <div class="m_new_list" v-for="item in articleData" :key="item.id">
          <div class="m_new_item">
              <div class="m_new_info">
              <h1 class="m_new_title" @click="handleClick(item.articleId)"><a class="m_recommend_a" href="#">{{item.articleTitle}}</a> </h1>
              <p class="m_new_text">
                  {{item.articleSummary}}
              </p>
              <div class="m_publish_info">
                  <div class="m_publish_avarter">
                  <img src="../../assets/logo.png" alt="">
                  <div class="m_avarter_name"><a class="m_recommend_a" href="#">{{item.aboutName}}</a></div>
                  </div>
                  <div class="m_publish_time"><li class="el-icon-date"></li>{{item.createTime}}</div>
                  <span class="m_publish_time"><i class="el-icon-view
  "></i>{{item.views}}</span>
                  <span class="m_publish_time"><i class="el-icon-chat-line-round
  "></i>{{item.commentCount}}</span>
              </div>
              <div class="m_new_category"><a href="#" class="m_category_a">{{item.categoryName}}</a></div>
                  <div class="tags"><el-tag type="success">{{item.tagsName}}</el-tag></div>

              </div>
              <div class="m_new_img"  @click="handleClick(item.articleId)">
              <img :src="item.picture" alt="">
              </div>
          </div>
          </div>
          <hr>
          <div class="m_page">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Aside from "../../components/Aside.vue"
import NavBar from '../../components/NavBar.vue'
import {
  ArticleShow,
  showCategoryCount
} from "../../network/article";
export default {
  name: 'Category',
  components: {
    NavBar,
    Aside,
  },
  data() {
    return {
      articleData: [], // 文章列表
      categoryData: [],
      currentPage: 1,
      pageSize: 10,
      total: 8,
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log("sessionStorage", sessionStorage.getItem("user"));
    console.log(user && user.userName, user && user.userId);

    // 分页查询文章
    ArticleShow(this.currentPage, this.pageSize).then((res) => {
      console.log(res.data+"----");
      if (res) {
        this.articleData = res.data;
        this.total = res.total;
      } else {
        this.articleData = [];
        this.total = 0;
      }
    });
    //查询文章分类个数
    showCategoryCount().then((res) => {
      if (res) {
        this.categoryData = res.data;
      } else {
        this.categoryData = [];
      }
    });

  },
  methods: {
    handleClick(articleId){
      console.log("点击的文章"+articleId);
      this.$router.push({
        name: "details",
        params: {
          articleId: articleId,
        },
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        ArticleShow(
          this.form.noticeContent,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      }  else {
        // 普通查询
        ArticleShow(this.currentPage, this.pageSize).then((res) => {
        console.log(res.data,"----");
        if (res) {
          this.articleData = res.data;
          this.total = res.total;
        } else {
          this.articleData = [];
          this.total = 0;
        }
      });
      }
    }
  }

}
</script>
<style scoped>
#backgroundImg {
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
.container {
  width: 92%;
  margin: 0px auto 0;
  vertical-align: top;
}
.category_container {
  width: 75%;
  display: inline-block;
}
.m_opacity {
  opacity: 0.9;
}
.m_title {
    margin: 0px auto 30px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    background: #fff;
    padding: 30px 10px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
}
.m_tag {
    margin: 5px 0;
    display: inline-block;
}
.m_tag_item {
    text-align: left;
    display: inline-block;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
}
.m_tag_name {
    padding: 7.6px 21px;
    border: 1px solid #00B5AD;
    border-right: none;
    border-radius: 5px 0 0 5px;
    text-decoration: none;
    color: #00B5AD;
}
.m_tag_number {
    display: inline-block;
    /* width: 0x;
    height: 0px; */
    /* border: 1px solid #00B5AD;
    border-radius: 0 5px  5px 0; */
    color: #00B5AD;
    position: relative;
    left: -2px;
    padding:2.2px 14px;
    border: #00B5AD solid 1px;
    border-radius: 0 5px 5px 0;
}
.m_tag_number:before{
    box-sizing: content-box;
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 8px;;
    left: -16px;
    padding:0;
    border-right: 8px solid #FFFFFF;
    border-top:8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left:8px solid transparent;
    display: block;
    content:'';
    z-index: 12;
}
.m_tag_number:after{
    box-sizing: content-box;
    width: 0px;
    height: 0px;
    position: absolute;
    top: 7px;;
    left: -18px;
    padding:0;
    border-right: 9px solid #00B5AD;
    border-top:9px solid transparent;
    border-bottom:9px solid transparent;
    border-left:9px solid transparent;
    display: block;
    content:'';
    z-index:10
}
.m_recommend_a {
  width: 100%;
  display: block;
  color: #333;
  overflow: hidden;
  position: relative;
  text-decoration: none;
}
.m_new {
  margin: 0 auto 30px;
  padding: 0 21px 50px;
  background-color: #fff;
  border-radius: 5px; 
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px; 
  opacity: 0.9;
}
.m_new_list {
  margin: 0 auto;
  padding:28px 0;
  text-align: left;
  opacity: 0.9;
  border-bottom: 1px solid rgba(34,36,38,.15);
}
.m_new_info {
  padding: 14px;
  width: 70%;
  display: inline-block;
  text-align: left;
}
.m_new_title {
  font-size: 25px;
  font-weight: 700;
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 10px;
}
.m_new_text {
  margin: 35px 0 0;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.8;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: rgba(0,0,0,0.6);
}
.m_publish_info {
  margin-top: 30px;
  padding: 14px;
  height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.m_publish_avarter {
  display: inline-block;
}
.m_publish_avarter img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.m_avarter_name {
  display: inline-block;
  margin-left: 5px;
  color: #1e70bf;
  font-size: 14px;
  line-height: 14px;
  vertical-align: middle;
}
.m_publish_time {
  color: rgba(0,0,0,.4);
  font-size: 16px;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;

}
.m_new_category {
  float: right;
  border-radius: 5px;
  border: 1px solid #00B5AD;
  background-color: #fff;
  cursor: pointer;
  padding: 3px;
  position: relative;
  bottom: -45px;
}
.m_category_a {
  text-decoration: none;
  color: #00B5AD;
  font-size: 14px;

}
.tags {
  float: right;
  position: relative;
  bottom: -45px;
  margin-right: 5px;
}
.tags span {
  padding: 0 5px;
  height: 27px;
  line-height: 27px;
}
.m_new_img {
  width: 25%;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-top: 14px;
  margin-left: 10px;
  border-radius: 5px;
  transition: all .6s;
  overflow: hidden;
}
.m_new_img img {
  width: 100%;
  height: 13vw;
  vertical-align: bottom;
  border-radius: 5px;
  transition: all .6s;
  overflow: hidden;
}
.m_new_img img:hover {
  transform: scale(1.1);
}
.m_page {
  background: #fff;
  border-radius: 0 0 5px 5px;
  margin: 30px auto 0px;
  padding: 10px;
  opacity: 0.9;
}
</style>