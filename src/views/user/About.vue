<template>
    <div id="About" class="top">
        <el-backtop target=".top" :bottom="200"></el-backtop>
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="headline">关于我</div>
        <div class="m_about">
            <Aside></Aside>
            <div class="about_contain">
                <div class="about_img"><img :src="aboutTable.aboutImg" alt=""></div>
                <div class="about_avater">名字</div>
                <div>
                    <div class="about_options">
                        <el-popover
                            placement="bottom"
                            width="150"
                            trigger="hover">
                            <img :src="aboutTable.aboutBgimg" class="button_img" alt="">
                            <div class="hover_titel">微信 </div>
                            <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/weixin.png"/></el-button>
                        </el-popover>
                    </div>
                    <div class="about_options">
                        <el-popover
                            placement="bottom"
                            width="150"
                            trigger="hover">
                            <img :src="aboutTable.aboutQq" class="button_img" alt="">
                            <div class="hover_titel">qq </div>
                            <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/qq.png"/></el-button>
                        </el-popover>
                    </div>
                    <div class="about_options">
                        <a target="_blank" href="https://github.com/richard-lky/blog_system-master">
                            <el-popover
                                placement="bottom"
                                width="160"
                                trigger="hover"
                                content="点击跳转到GitHub">
                                <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/github.png"/></el-button>
                            </el-popover>
                        </a>
                    </div>
                    <div class="about_options">
                        <el-popover
                            placement="bottom"
                            width="175"
                            trigger="hover"
                            content="1610049531@qq.com">
                            <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/email.png"/></el-button>
                        </el-popover>
                    </div>
                </div>
                <hr class="about_separator">
                <div class="about_introduction">
                    <mavon-editor v-html="aboutTable.aboutContent" 
                        :subfield="false"
                        :boxShadow="false"
                        defaultOpen="preview"
                        :toolbarsFlag="false"
                        previewBackground="#4183C4"/>
                </div>
                <el-divider>END</el-divider>
            </div>
        </div>
    </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import NavBar from "../../components/NavBar.vue"
import Aside from '../../components/Aside.vue'

import {
    ShowAbout
} from '../../network/others'
export default {
    name: "About",
    components: {
        NavBar,
        Aside
    },
    data() {
        return {
            aboutTable: {
                aboutContent: '',
            }
        }
    },
    method: {

    },
    mounted() {
        ShowAbout().then(res => {
            console.log(res)
            if(res){
                this.aboutTable = res;
            }else {
                this.aboutTable =[];
            }
        })
    }
    
}
</script>

<style scoped>
#About {
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
.m_about{
    width: 92%;
    margin: 0px auto 30px;
    vertical-align: top;
}
.about_contain {
    display: inline-block;
    width: 75%;
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
.about_img {
    margin-top: 30px;
    object-fit: cover;
}
.about_img img{
    height: 150px;
    width: 150px;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 50%;
}
.about_avater {
    font-size: 25px;
    font-weight: 600;
    margin-top: 10px;
}
.about_options {
    display: inline-block;
    margin: 0 4px;
    margin-top: 20px;
}
.button_img {
    width: 124px;
    height: 124px;
    border-radius: 5px;
}
.hover_titel {
    text-align: center;
}
.option_button {
    padding: 0;
    width: 36px;
    height: 36px;
    background: #E0E1E2;
    border-radius: 50%;
}
.button_icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    /* list-style-image: url(../../assets/img/weixin.png); */
}
.button_icon img {
    width: 20px;
    height: 20px;
}
.about_separator {
    width: 170px;
    margin: 15px auto;
}
.about_introduction {
    margin-bottom: 50px;
}
</style>