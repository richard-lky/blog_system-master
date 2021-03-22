<template>
    <div id="Resources" class="m_resources top">
        <el-backtop target=".top" :bottom="200"></el-backtop>
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="headline">学习资源</div>
        <div class="container">
            <Aside></Aside>
            <div class="resource_container">
                <div class="resources_contain">
                    <div class="resources_items">
                        <div class="resources_item">
                            <div class="resources_items">
                                <div class="resources_item">
                                    <a href="#" class="item_name">数据表GV</a>
                                    <div class="item_number">4</div>
                                </div>
                            </div>
                            <div class="resources_items">
                                <div class="resources_item">
                                    <a href="#" class="item_name">数据表GV</a>
                                    <div class="item_number">4</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="resources_contain">
                    <div class="resources_content">
                        <div class="resources_collect">
                            <div class="resource_title"><li class="el-icon-s-flag"></li> <span>学习资源</span></div>
                            <div class="collect_content">
                                <a class="collect_item" v-for="item in articleData" :key="item.id">
                                    <div class="item_content">
                                        <img :src="$baseImgUrl + item.resourceImg" alt="">
                                        <div class="link_name">{{item.resourceName}}</div>
                                        <div class="link_meta">视频类</div>
                                        <div class="link_description">{{item.resourceDescribe}}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import Aside from '../../components/Aside.vue'
export default {
    name: "Resources",
    components: {
        NavBar,
        Aside,
    },
    data() {
        return {
            resourceCategory: 1,
            articleData: [],
        }
    },
    created() {
        const that = this;
        this.$axios.get('/resource/showResourceAll', {
            params: {
                resourceCategory: this.resourceCategory,
            }
        })
        .then(function (response) {
            console.log(response.data.data);
            that.articleData = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}
</script>

<style scoped>
#Resources{
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
.resource_container {
  width: 75%;
  display: inline-block;
}
.resources_contain {
    margin: 0 auto 30px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    background: #fff;
    padding: 30px 10px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.resources_items {
    margin: 5px 0;
    display: inline-block;
}
.resources_item {
    text-align: left;
    display: inline-block;
    position: relative;
    margin: 0 5px;
    font-size: 14px;
    cursor: pointer;
}
.item_name {
    padding: 8.6px 21px;
    border: 1px solid #00B5AD;
    border-right: none;
    border-radius: 5px 0 0 5px;
    text-decoration: none;
    color: #00B5AD;
}
.item_number {
    display: inline-block;
    /* width: 0x;
    height: 0px; */
    /* border: 1px solid #00B5AD;
    border-radius: 0 5px  5px 0; */
    color: #00B5AD;
    position: relative;
    left: -2px;
    padding:2px 14px;
    border: #00B5AD solid 1px;
    border-radius: 0 5px 5px 0;
}
.item_number:before{
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
.item_number:after{
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
.resource_title {
    font-size: 24px;
    font-weight: 900;
    line-height: 42px;
    color: rgba(0,0,0,.87);
}
.resource_title .el-icon-s-flag {
    font-size: 40px;
    vertical-align: middle;
}
.collect_content {
    margin-top: 20px;
}
.collect_content a {
    width: 20%;
    min-height: 110px;
    text-decoration: none;
    transition: all .4s; 
    display: inline-block;
}
.collect_item {
    text-align: left;
    margin: 12.25px 10.5px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 0 0 1px #D4D4D5, 0 2px 0 0 #F2711C, 0 1px 3px 0 #D4D4D5;
    transition: all .4s; 
}
.collect_item:hover {
    transform: translateY(-10px);
}
.item_content {
    padding: 14px;
    position: relative;
}
.item_content img {
   height: 45px; 
   width: 45px;
   border-radius: 50%;
   vertical-align: middle;
   display: inline-block;
}
.link_name {
    width: 50%;
    font-size: 18px;
    line-height: 18px;
    font-weight: bold;
    color: #2C7EEA;
    margin-left: 10px;
    display: inline-block;
    vertical-align: top;
}

.link_meta {
    line-height: 14px;
    font-size: 14px;
    color: rgba(0,0,0,.4);
    display: inline-block;
    position: absolute;
    left: 69px;
    top: 45px;
}
.link_description {
    display: inline-block;
    position: absolute;
    top: 65px;
    left: 14px;
}
</style>