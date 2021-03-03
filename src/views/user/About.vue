<template>
    <div id="About">
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="m_about">
            <div class="about_contain">
                <div class="about_img"><img src="../../assets/img/bg_lake.jpg" alt=""></div>
                <div class="about_avater">名字</div>
                <div>
                    <div class="about_options">
                        <el-popover
                            placement="bottom"
                            width="150"
                            trigger="hover">
                            <img src="../../assets/img/bg_lake.jpg" class="button_img" alt="">
                            <div class="hover_titel">微信 </div>
                            <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/weixin.png"/></el-button>
                        </el-popover>
                    </div>
                    <div class="about_options">
                        <el-popover
                            placement="bottom"
                            width="150"
                            trigger="hover">
                            <img src="../../assets/img/bg_lake.jpg" class="button_img" alt="">
                            <div class="hover_titel">qq </div>
                            <el-button slot="reference" class="option_button"><img class="button_icon" src="../../assets/img/qq.png"/></el-button>
                        </el-popover>
                    </div>
                    <div class="about_options">
                        <a href="https://github.com/richard-lky/blog_system-master">
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
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../../components/NavBar.vue"
export default {
    name: "About",
    components: {
        NavBar,
    }
}
</script>

<style scoped>
#About {
  color: black;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg_lake.jpg);
  background-size: cover;
  background-position: center;
  /* position: relative; */
  overflow: auto;
}
.m_about{
    width: 92%;
    margin: 5px auto 30px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    margin-top: 274px;
    background: #fff;
    padding: 30px 10px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.about_img {
    margin-top: 30px;
}
.about_img img{
    height: 150px;
    width: 150px;
    margin: 0 auto;
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
</style>