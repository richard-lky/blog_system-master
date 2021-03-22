<template>
    <div class="aside_content">
        <div class="aside_avater">
            <div class="card_content">
                <div class="card_info">
                    <div class="card_info_img">
                        <img :src="$baseImgUrl + userInfo.aboutImg" alt="">
                    </div>
                    <div class="author_info">{{userInfo.aboutName}}</div>
                    <div class="author_description">{{userInfo.aboutMotto}}</div>
                </div>
                <div class="card_announcement">
                    <div class="announcement_item">文章<div class="announcement_item_num">{{articleInfo.articleId}}</div></div>
                    <div class="announcement_item">分类<div class="announcement_item_num">{{articleInfo.categoryId}}</div></div>
                    <div class="announcement_item">标签<div class="announcement_item_num">{{articleInfo.tagsId}}</div></div>
                </div>
            </div>
        </div>
        <br>
        <div class="aside_avater">
            <div class="card_announcement" >
                <div class="card_headline"><i class="el-icon-price-tag"></i>标签</div>
                <el-tag
                    v-for="item in tagsData"
                    :key="item.id"
                    style="margin: 5px"
                    :type="item.tagsId % 4  == '1' ? '' : (item.tagsId % 4  == '2' ? 'success' : (item.tagsId % 4  == '3' ? 'danger' : 'warning'))">
                    {{ item.tagsName }}
                </el-tag>
            </div>
        </div>
        <br>
        <div class="aside_avater">
            <div class="card_announcement">
                <div class="card_headline"><i class="el-icon-message-solid"></i>公告</div>
                <p>{{noticeData.noticeContent}}</p>
                <img src="../assets/img/announce.gif" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Aside",
    data() {
        return {
            noticeData: [],
            tagsData: [],
            userInfo: [],
            articleInfo: [],
        }
    },
    method() {
        
    },
    created() {
        const that = this;
         this.$axios.get('/notice/showNotice')  //公告数据
        .then(function (response) {
            console.log(response.data);
            that.noticeData = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
         this.$axios.get('/tags/showTagsAll')   //标签数据
        .then(function (response) {
            console.log(response.data.data);
            that.tagsData = response.data.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.$axios.get('/about/showUser')   //博主信息
        .then(function (response) {
            console.log(response.data);
            that.userInfo = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.$axios.get('/article/showArticleInfo')   //文章信息
        .then(function (response) {
            console.log("****"+response.data);
            that.articleInfo = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>
<style scoped>
.aside_content {
    display: inline-block;
    width: 25%;
    vertical-align: top;
}
.aside_avater {
    background: #fff;
    margin-right: 15px;
    padding: 20px 24px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    opacity: 0.9;
}
.card_info_img {
    height: 110px;
    margin: 0 auto;
}
.card_info img{
    width: 100%;
    height: 100%;
    max-width: 110px;
    max-height: 110px;
    border-radius: 50%;
    transition: all .6s;
    object-fit: cover;
}
.card_info img:hover {
    -webkit-transform:rotate(360deg);
    transform:rotate(360deg);
    -webkit-transition:-webkit-transform .6s linear;
    transition:transform .6s linear;
}
.card_headline {
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    text-decoration: none;
    font-family: Consolas,'微软雅黑';
}
.tags_item {
    margin: 5px;
}
.card_announcement p{
    line-height: 30px;
    color: rgba(0,0,0,.6);
    text-decoration: none;
    font-family: Consolas,'微软雅黑';
}
.announcement_item {
    display: inline-block;
    margin: 15px 10px 5px;
    color: rgba(0,0,0,.6);
    font-size: 18px;
}
.announcement_item_num {
    margin-top: 10px;
}
.author_info {
    padding: 0px;
    margin: 0px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    text-decoration: none;
    font-family: Consolas,'微软雅黑';
    box-sizing: border-box;
}
.author_description {
    padding: 0px;
    margin: 0px;
    font-size: 16px;
    line-height: 30px;
    color: rgba(0,0,0,.6);
    text-decoration: none;
    font-family: Consolas,'微软雅黑';
    box-sizing: border-box;
}
.card_announcement img{
    width: 100%;
    height: 100%;
}
.card_announcement img{
    width: 100%;
    height: 100%;
}
</style>