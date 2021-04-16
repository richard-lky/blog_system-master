<template>
    <div id="Details" class="top">
        <el-backtop target=".top" :bottom="200"></el-backtop>
        <el-row>
            <el-col><nav-bar></nav-bar></el-col>
        </el-row>
        <div class="headline">文章详情</div>
        <div class="m-details-contain">
            <Aside></Aside>
            <!-- 文章详情 -->
            <div class="m-details">
                <div  class="m-contain-content">
                    <div class="details_title">{{articleTable.articleTitle}}</div>
                    <div class="article_info">
                        <div class="info-bar">
                            <span>作者：{{articleTable.aboutName}}</span>
                            <span class="info-bar-top"><i class="el-icon-date m-icon"></i>{{articleTable.createTime}}</span>
                            <span class="info-bar-top"><i class="el-icon-view m-icon"></i>{{articleTable.views}}</span>
                            <span class="info-bar-top"><i class="el-icon-chat-dot-round m-icon"></i>{{articleTable.commentCount}}</span>
                        </div>
                        <div class="info-bar">
                            <span>分类专栏：</span><span>{{articleTable.categoryName}}</span>
                            <span class="info-bar-bottom">文章标签：</span><span>{{articleTable.tagsName}}</span>
                        </div>
                    </div>
                    <mavon-editor v-html="articleTable.articleContent" 
                        :subfield="false"
                        :boxShadow="false"
                        defaultOpen="preview"
                        :toolbarsFlag="false"
                        previewBackground="#4183C4"/>
                    <!-- end -->
                    <div class="m-end">
                        <el-divider><div class="m-end-text">END</div></el-divider>
                    </div>
                </div>
                <div>
                    <!-- 评论区 -->
                    <div class="m-comment">
                        <!-- 评论列表 -->
                        <div class="m-comment-list">
                            <div>
                                <h3 class="comment-list-title">评论</h3>
                                <div v-if="articleData.length == 0"><br>还没有人评论，快来评论吧！！！</div>
                                <div class="comment" v-for="item in articleData" :key="item.id">
                                    <a href="#" class="avatar"><img :src="item.commentImg" alt=""></a>
                                    <div class="content" v-if="item.commentName">
                                        <a href="#" class="author"><span>{{item.commentName}}</span></a>
                                        <div class="metadata"><span>{{item.commentTime}}</span></div>
                                        <div class="text">{{item.commentContent}}</div>
                                        <div class="actions">
                                            <a href="#" class="reply" @click="reply(item.commentName,item.commentId)">回复</a>
                                        </div>
                                    </div>
                                    <!-- 子集评论 -->
                                    <div class="comment-child" v-for="child in item.replyList" :key="child.id">
                                        <div class="comment">
                                            <a href="#" class="avatar"><img :src="child.replyImg" alt=""></a>
                                            <div class="content">
                                                <a href="#" class="author">
                                                    <span>{{child.replyName}}</span></a>
                                                <div class="author-tag" v-if="child.innkeeper == 1">栈主</div>
                                                <div class="author-tag" v-if="child.innkeeper == 0">游客</div>
                                                <span class="mteal">@ {{item.commentName}}</span>
                                                
                                                <div class="metadata"><span>{{child.replyTime}}</span></div>
                                                <div class="text">{{child.replyContent}}</div>
                                                <div class="actions">
                                                    <a href="#" class="reply"  @click="reply(child.replyName,item.commentId)">回复</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="m-comment-reply">
                            <div class="comment-form">
                                <el-form
                        :model="commentForm"
                        status-icon
                        :rules="rules"
                        ref="commentForm"
                        label-width="40px"
                        class="demo-ruleForm"
                        >
                        <el-form-item prop="commentName">
                            <el-input
                                class="info_input"
                                placeholder="请输入昵称"
                                prefix-icon="el-icon-user"
                                v-model="commentForm.commentName">
                            </el-input>
                            </el-form-item>
                            <div class="space"></div>
                            <el-form-item prop="commentMail">
                            <el-input
                                class="info_input"
                                placeholder="请输入邮箱，不做展示用"
                                prefix-icon="el-icon-message"
                                v-model="commentForm.commentMail">
                            </el-input>
                            </el-form-item>
                            <div class="space"></div>
                            <el-form-item>
                            <el-input
                                class="info_input"
                                placeholder="请输入头像地址，非必填"
                                prefix-icon="el-icon-picture-outline"
                                v-model="commentForm.commentImg">
                            </el-input>
                            </el-form-item>
                            <div class="space"></div>
                            <el-form-item>
                            <el-input
                                class="info_input"
                                placeholder="请输入个人网站地址，非必填"
                                prefix-icon="el-icon-paperclip"
                                v-model="commentForm.commentWebsite">
                            </el-input>
                            </el-form-item>
                            <el-input
                                id="textarea"
                                type="textarea"
                                style="width: 96%"
                                :rows="7"
                                maxlength="100"
                                show-word-limit
                                :placeholder="placeholder"
                                v-model="commentForm.commentContent">
                                </el-input>
                                <el-button type="success" class="m_submit_buttom" @click="submit(commentForm)" ><i class="el-icon-edit"></i>发表</el-button>
                        </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Aside from '../../components/Aside.vue'
import NavBar from '../../components/NavBar.vue'
import $ from 'jquery'
import {
  ShowCommentById,
  AddComment
} from "../../network/comment";
import {
    ShowArticleById,
    addArticleViews
} from '../../network/article';
export default {
    name: "Details",
    components: {
        Aside,
        NavBar,
        mavonEditor
    },
    data() {
        var checkId = (value, callback) => {
        if (!value) {
            return callback(new Error("昵称不能为空"));
        }
            // if (value !== '') {
            // let regex = /\w/
            // if (!regex.test(value)) {
            //     return callback(new Error('昵称只能为数字、字母和下划线'))
            // } else {
            //     callback()
            // }
            // }
            callback()
        };
        var checkEmail = (value, callback) => {
        if (!value) {
            return callback(new Error("邮箱不能为空"));
        }
            if (value !== '') {
            let reg = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
            if (!reg.test(value)) {
                return callback(new Error('请输入正确的邮箱！'))
            } else {
                callback()
            }
        }
        callback()
        };
        return {
            value: `<blockquote>
									<p>你好</p>
									</blockquote>
									<p><code>java</code></p>`,
            defaultData: "preview",
            textarea: '',
            input_info: '',
            placeholder: "请输入评论信息...",
            articleData: [], // 评论列表
            articleTable: [], //文章内容详情
            currentPage: 1,
            pageSize: 10,
            total: 8,
            commentForm: {
                commentContent: '',
                commentName: '',
                commentMail: '',
                commentWebsite: '',
                commentImg: '',
                replyId: '',
                articleId: '',
                
            },
            rules: {
                commentMail: [{ validator: checkEmail, trigger: "blur" }],
                commentName: [{ validator: checkId, trigger: "blur" }],
            },
        };
    },
    created() {
        console.log(sessionStorage.getItem('articleId'),"++***++");
        let Id = parseInt(this.$route.params.articleId);
        let views = parseInt(this.$route.params.views);
        if(Id) {
            sessionStorage.setItem('articleId',Id);console.log(sessionStorage.getItem('articleId'),"++***++");
            addArticleViews(Id,views);
        }
        
        ShowCommentById(sessionStorage.getItem('articleId'),this.currentPage,this.pageSize).then((res=>{
            console.log(sessionStorage.getItem('articleId'),"++***++",res);
            if (res) {
                console.log(1)
                this.articleData = res.data;
                this.total = res.total;
            } else {
                this.articleData = [];
                console.log(this.articleData)
                this.total = 0;
            }
        }));
        ShowArticleById(sessionStorage.getItem('articleId')).then((res=>{
            console.log(sessionStorage.getItem('articleId'),"++***++",res);
            if (res) {
                this.articleTable = res;
            } else {
                this.articleTable = [];
            }
        }));
      
    },
    methods: {
         reply(name,replyId) {
            $("textarea").focus();
            this.placeholder = "@"+name;
            this.commentForm.replyId = replyId;
        },
        submit(commentForm){
            console.log(commentForm)
            this.commentForm.articleId = sessionStorage.getItem('articleId');
            if (commentForm.commentContent == '') {
                this.$message.error('留言信息不能为空！')
            }else {
                AddComment(this.commentForm);
                this.$message.success('发表成功！')
            }
        }

    },
    computed: {
        
    }
}
</script>
<style scoped>
#Details {
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
.m-details {
    width: 75%;
    display: inline-block;
    /* padding:28px 21px; */
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
  -webkit-box-shadow: #000000 0px 0px 10px;
  opacity: 0.9;
}
.m-details-contain {
  width: 92%;
  margin: 0px auto;
  vertical-align: top;
}
.m-contain-content {
    padding: 28px 36px;
}
.m-end {
    display: inline-block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;
}
.m-end-text {
    margin: 0 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: rgba(0,0,0,.85);
    font-size: 1rem;
}
.m-end-line {
  height: 2px;
  flex-grow: 1;
  background-color: #dddfde;
}
.m-comment {
    padding: 14px;
    margin: 56px 0;
}
.info_input {
    display: inline-block;
}
.space {
    width: 1.3%;
    display: inline-block;
}
.m-comment-list {
    border: 1px solid rgba(34,36,38,.15);
    border-top: 2px solid #00B5AD;
    padding: 14px;
    margin-bottom: 30px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border-radius: 5px;
}
.comment-list-title {
    margin-top: 0;
    border-bottom: 1px solid #dddfde;
}
.m-comment-list .comment {
    margin-top: 14px;
    padding-top: 5px;
}
.m-comment-list .comment .avatar {
    height: 40px;
    width: 40px;
    margin-top: 5px;
    border-radius: 3px;
    float: left;
    vertical-align: top;
}
.m-comment-list .comment .avatar img {
    height: 40px;
    width:40px;
    border-radius: 3px;
}
.m-comment-list .comment .content {
    margin-left: 59px;
    position: relative;
    display: block;
}
.m-comment-list .comment .content .author {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    font-weight: 700;
    display: inline-block;
}
.m-comment-list .comment .content a :hover {
    color: #4183C4;
}
.m-comment-list .comment .content .metadata {
    display: inline-block;
    margin-left: 10px;
    color: rgba(0,0,0,.4);
    font-size: .875em;
}
.m-comment-list .comment .content .text {
    margin: 5px 0 10px;
}

.m-comment-list .comment .content .reply {
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    margin: 0 .75em 0 0;
    color: rgba(0,0,0,.4);
}
.m-comment-list .comment .comment-child {
    margin: -21px 0 -14px 20px;
    padding: 40px  0 28px 39px;
    border-left: 1px solid  #dddfde;
}
.m-comment-list .comment .content .author-tag {
    display: inline-block;
    padding: 2px;
    margin: 0 10px 0 5px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
    color: #00B5AD;
    border: 1px solid #00B5AD;
}
.m-comment-list .comment .content .mteal {
    color: #00B5AD;
    font-weight: 700;
}
.comment-form .m-submit-buttom {
    background: #00B5AD;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin-top: 10px;
    float: right;
}
.comment-form .m-submit-buttom .el-icon-edit {
    margin-right: 7px;
}
.v-note-wrapper {
    border: none;
}
.details_title {
    margin: 0 0 15px 0;
    font-size: 28px;
    font-weight: 600;
}
.article_info {
    background: #f6f6f6;
    margin-bottom: 20px;
    border-radius: 5px;
}
.info-bar {
    color: #999aaa;
    padding: 10px 10px;
}
.info-bar-top {
    margin: 0 10px;
    color: #999aaa;
}
.info-bar-bottom {
    margin: 0 0 0 20px;
}
.el-form-item {
    display: inline-block;
    width: 24%;
}
.el-form-item__content {
    margin: 10px 0 0;
}
.m_submit_buttom {
    background: #00B5AD;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
    float: right;
}
</style>