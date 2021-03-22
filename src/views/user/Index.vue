<template>
  <div id="index" class="top">
      <el-backtop target=".top" :bottom="200"></el-backtop>
        <nav-bar></nav-bar>
        <div class="headline">首页</div>
      <div class="container">
        <Aside></Aside>
        <div class="index_container">
          <!-- <div :xs="20" :sm="20" class="m-opacity m-title">
            <i class="el-icon-star-on m-icon"></i>
            正文</div> -->
          <div class="m-recommend">
            <div class="m-recommend-item">
                  <a href="#" class="m-recommend-a">
                  <img src="../../assets/img/bg_index.jpg" alt="" class="m-img">
                  <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
                </a>
            </div>
            <div class="m-recommend-item">
              <a href="#" class="m-recommend-a">
                <img src="../../assets/logo.png" alt="" class="m-img">
                <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
              </a>
            </div>
            <div class="m-recommend-item">
              <a href="#" class="m-recommend-a">
                <img src="../../assets/img/bg_404.jpg" alt="" class="m-img">
                <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
              </a>
            </div>
            <div class="m-recommend-item">
                <a href="#" class="m-recommend-a">
                  <img src="../../assets/img/bg_404.jpg" alt="" class="m-img">
                  <span class="m-img-title"><span style="padding-left:6px">案发</span></span>
                </a>
              </div>
          </div>
          <div class="m-new-blogs">
            <div :xs="20" :sm="20" class="m-opacity m-title">
            <i class="el-icon-s-flag m-icon"></i>
            最新博文</div>
            <div class="m-new-list">
              <div class="m-new-item"  v-for="item in articleData" :key="item.id">
                <div class="m-new-info">
                  <h1 class="m-new-title" @click="handleClick(item.articleId)"><a class="m-recommend_title-a" href="#">{{item.articleTitle}}</a> </h1>
                  <p class="m-new-text">
                    {{item.articleSummary}}
                  </p>
                  <div class="m-publish-info">
                      <div class="m-publish-avarter">
                      <img :src="$baseImgUrl + item.aboutImg" alt="">
                      <div class="m-avarter-name"><a class="m-recommend_title-a" href="#">{{item.aboutName}}</a></div>
                    </div>
                    <div class="m-publish-time"><i class="el-icon-date m-icon"></i>{{item.createTime}}</div>
                    <span class="m-publish-time"><i class="el-icon-view
    m-icon"></i>{{item.views}}</span>
                    <span class="m-publish-time"><i class="el-icon-chat-dot-round
    m-icon"></i>{{item.commentCount}}</span>
                  </div>
                  <div class="m-new-category"><a href="#" class="m-category-a">{{item.categoryName}}</a></div>
                  <div class="tags"><el-tag type="success">{{item.tagsName}}</el-tag></div>
                </div>
                <div class="m-new-img" @click="handleClick(item.articleId)">
                  <img :src="$baseImgUrl + item.picture" alt="">
                </div>
              </div>
              <hr>
              <div class="m-page">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    <!-- <el-row>        
      <el-col :xs="10" :sm="6" :md="4" :lg="3" class="nav">导航栏
        <nav-bar></nav-bar>
      </el-col>
      <el-col :md="18" class="content">正文</el-col>
      </el-row> -->
      
  </div>
  
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import Aside from '../../components/Aside.vue'
import {
  SearchArticle,
} from "../../network/article";
export default {
  name: 'Index',
  components: {
    NavBar,
    Aside
  },
  data() {
    return {
      articleData: [], // 文章列表
      currentPage: 1,
      pageSize: 5,
      total: 8,
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    console.log("sessionStorage", sessionStorage.getItem("user"));
    console.log(user && user.userName, user && user.userId);

    // this.$axios.get("/article").then(res => {
    //   console.log(res+"----");
    //     if (res) {
    //     // for (let i = 0; i < res.data.length; i++) {
    //     //   res.data[i].isreturn = 1
    //     // }
    //     this.articleData = res.data;
    //     this.total = res.total;
    //   } else {
    //     this.articleData = [];
    //     this.total = 0;
    //   }
    // })

    SearchArticle(this.currentPage, this.pageSize).then((res) => {
      // TODO
      // this.articleData = res
      // this.total = res.total
      console.log(res.data+"----");
      if (res) {
        // for (let i = 0; i < res.data.length; i++) {
        //   res.data[i].isreturn = 1
        // }
        this.articleData = res.data;
        this.total = res.total;
      } else {
        this.articleData = [];
        this.total = 0;
      }
    });

  },
  methods: {
    handleClick(articleId){
      console.log("点击的文章"+articleId);
      // this.$router.push("/details/"+articleId);
      // this.$router.push("/details/");
      this.$router.push({
        name: "details",
        params: {
          articleId: articleId,
        },
      });
    }
  }
};
</script>

<style scoped>
#index {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/sky.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: auto;
  vertical-align: top;
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
.index_container {
  width: 75%;
  display: inline-block;
}
.content {
  /* position: absolute; */
  /* margin: 274px 9% 0 9%;
  width: 80%; */
  
  /* background: white; */
  
  padding: 10px 30px;
  border-radius: 5px;
  float: center;
  overflow: auto;
  
}
.m-opacity {
  opacity: 0.9;
}
.m-title {
  font-size: 16px;
  line-height: 30px;
  color: rgba(0,0,0,.6);
  background: #fff;
  padding: 10px 30px;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
}
.m-icon {
  font-size: 16px;
}
.m-recommend{
  width: 100%;
}
.m-recommend-a {
  height: 13vw;
  width: 100%;
  display: block;
  color: #333;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  text-decoration: none;
}
.m-recommend_title-a {
  width: 100%;
  display: block;
  color: #333;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  text-decoration: none;
}
.m-img {
  width: 100%;
  height: 13vw;
  border-radius: 3px;
  object-fit: cover;
  opacity: 0.9;
  overflow: hidden;
  transition: all .6s;
}
.m-img:hover {
  transform: scale(1.1);
}
.m-recommend-item {
  width: 25% !important;
  display: inline-block;
  padding: 0 7px 20px ;
  position: relative;
}
.m-img-title {
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  font-size: 18px;
  text-align: left;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.2);
  line-height: 40px;
  height: 40px;
  border-radius: 0 0 3px 3px;
  opacity: 0.9;
}
.m-new-item {
  margin-bottom: 40px;
}
.m-new-list {
  margin: 14px auto 30px;
  padding:28px 21px;
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
  opacity: 0.9;
}
.m-new-info {
  padding: 14px;
  width: 70%;
  display: inline-block;
  text-align: left;
}
.m-new-title {
  font-size: 25px;
  font-weight: 700;
  padding: 0px 10px;
  margin-top: 0;
  margin-bottom: 10px;
}
.m-new-text {
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
.m-publish-info {
  margin-top: 30px;
  padding: 14px;
  height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: top;
}
.m-publish-avarter {
  display: inline-block;
}
.m-publish-avarter img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.m-avarter-name {
  display: inline-block;
  margin-left: 5px;
  color: #1e70bf;
  font-size: 14px;
  line-height: 14px;
  vertical-align: middle;
}
.m-publish-time {
  color: rgba(0,0,0,.4);
  font-size: 16px;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;

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
.m-new-category {
  float: right;
  border-radius: 5px;
  border: 1px solid #00B5AD;
  background-color: #fff;
  cursor: pointer;
  padding: 3px;
  position: relative;
  bottom: -45px;
}
.m-category-a {
  text-decoration: none;
  color: #00B5AD;
  font-size: 14px;

}
.m-new-img {
  width: 25%;
  height: 100%;
  display: inline-block;
  position: relative;
  vertical-align: top;
  margin-top: 14px;
  border-radius: 5px;
  margin-left: 10px;
  overflow: hidden;
}
.m-new-img img {
  width: 100%;
  height: 13vw;
  vertical-align: bottom;
  border-radius: 5px;
  transition:  all .6s;
}
.m-new-img img:hover {
  transform: scale(1.1);
}
.m-page {
  background: #fff;
  border-radius: 5px;
  text-align: center;
  margin: 30px auto 30px;
  padding: 10px;
  opacity: 0.9;
}


/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
/* ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #f5f5f5;
} */

/*定义滚动条轨道 内阴影+圆角
::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);
	border-radius: 3px;
	background-color: #F5F5F5;
}*/

/*定义滑块 内阴影+圆角*/
/* ::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #555;
} */
</style>
