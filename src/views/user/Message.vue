<template>
    <div id="Message" class="m_message_contain top">
        <el-backtop target=".top" :bottom="200"></el-backtop>
        <div>
            <nav-bar></nav-bar>
        </div>
        <div class="headline">留言板</div>
        <div class="container">
            <Aside></Aside>
            <div class="message_content">
                <div class="message_new">
                    <el-form
                        :model="messageForm"
                        status-icon
                        :rules="rules"
                        ref="messageForm"
                        label-width="40px"
                        class="demo-ruleForm"
                        >
                        <el-form-item prop="wordsName">
                            <el-input
                                class="info_input"
                                placeholder="请输入昵称"
                                prefix-icon="el-icon-user"
                                v-model="messageForm.wordsName">
                            </el-input>
                        </el-form-item>
                        <div class="space"></div>
                        <el-form-item prop="wordsMail">
                        <el-input
                            class="info_input"
                            placeholder="请输入邮箱，不做展示用"
                            prefix-icon="el-icon-message"
                            v-model="messageForm.wordsMail">
                        </el-input>
                        </el-form-item>
                        <div class="space"></div>
                        <el-form-item>
                        <el-input
                            class="info_input"
                            placeholder="请输入头像地址，非必填"
                            prefix-icon="el-icon-picture-outline"
                            v-model="messageForm.wordsImg">
                        </el-input>
                        </el-form-item>
                        <div class="space"></div>
                        <el-form-item>
                        <el-input
                            class="info_input"
                            placeholder="请输入个人网站地址，非必填"
                            prefix-icon="el-icon-paperclip"
                            v-model="messageForm.wordsWebsite">
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
                            v-model="messageForm.wordsContent">
                            </el-input>
                            <el-button type="success" class="m_submit_buttom" @click="submit(messageForm)" ><i class="el-icon-edit"></i>发表</el-button>
                    </el-form>
                </div>
                <!-- 留言列表 -->
                <div class="m_comment_list">
                    <div>
                        <h3 class="comment_list_title">留言</h3>
                        <div v-if="messageData.length == 0"><br>还没有人留言，快来留言吧！！！</div>
                        <div class="comment" v-for="item in messageData" :key="item.id">
                            <a href="#" class="avatar"><img :src="item.wordsImg" alt=""></a>
                            <div class="content">
                                <a href="#" class="author"><span>{{item.wordsName}}</span></a>
                                <div class="metadata"><span>{{item.wordsTime}}</span></div>
                                <div class="text">{{item.wordsContent}}</div>
                                <div class="actions">
                                    <a href="#" class="reply"  @click="childReply(item.wordsName,item.wordsId)">回复</a>
                                </div>
                            </div>
                            <!-- 子集留言 -->
                            <div class="comment_child" v-for="child in item.replyList" :key="child.id">
                                <div class="comment">
                                    <a href="#" class="avatar"><img :src="child.replyImg" alt=""></a>
                                    <div class="content">
                                        <a href="#" class="author">
                                            <span>{{child.replyName}}</span></a>
                                        <div class="author_tag" v-if="child.innkeeper == 1">栈主</div>
                                        <div class="author_tag" v-if="child.innkeeper == 0">游客</div>
                                        <!-- <div class="author_tag">栈主</div> -->
                                        <span class="mteal">@ {{item.wordsName}}</span>
                                        
                                        <div class="metadata"><span>{{child.replyTime}}</span></div>
                                        <div class="text">{{child.replyContent}}</div>
                                        <div class="actions">
                                            <a href="#" class="reply"  @click="childReply(child.replyName,item.wordsId)">回复</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <el-divider></el-divider>
                        </div>
                    </div>
                </div>
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
                <br><br>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import Aside from '../../components/Aside.vue'
import $ from 'jquery'
import {
    ShowWordsAll,
    AddMessage,
} from '../../network/message'
export default {
    name: "Friends",
    components: {
        NavBar,
        Aside,
    },
    data() {
        var checkId = (rule, value, callback) => {
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
        var checkEmail = (rule, value, callback) => {
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
            textarea: '',
            input_info: '',
            placeholder: "请输入留言信息...",
            messageData: [], // 留言列表
            messageForm: {
                wordsContent: '',
                wordsName: '',
                wordsMail: '',
                wordsWebsite: '',
                wordsImg: '',
                replyId: '',
                
            },
            currentPage: 1,
            pageSize: 10,
            total: 8,
            ruleForm: {
                email: "",
                id: "",
            },
            rules: {
                wordsMail: [{ validator: checkEmail, trigger: "blur" }],
                wordsName: [{ validator: checkId, trigger: "blur" }],
            },
        }
    },
    created() {
        ShowWordsAll(this.currentPage,this.pageSize).then((res=>{
            console.log("++***++",res);
            if (res) {
                this.messageData = res.data;
                this.total = res.total;
            } else {
                this.messageData = [];
                this.total = 0;
            }
        }));
    },
    methods: {
        childReply(name,replyId) {
            $("textarea").focus();
            this.placeholder = "@"+name;
            this.messageForm.replyId = replyId;
        },
        submit(messageForm){
            console.log(messageForm)
            if (messageForm.wordsContent == '') {
                this.$message.error('留言信息不能为空！')
            }else {
                AddMessage(this.messageForm);
                this.$message.success('发表成功！')
            }
        },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    //   if (this.queryModel === 2) {
    //     //模糊查询
    //     ArticleShow(
    //       this.form.noticeContent,
    //       this.currentPage,
    //       this.pageSize
    //     ).then((res) => {
    //       // TODO
    //       this.tableData = res.data;
    //       this.total = res.total;
    //     });
    //   }  else {
        // 普通查询
        ShowWordsAll(this.currentPage,this.pageSize).then((res=>{
            console.log("++***++",res);
            if (res) {
                this.messageData = res.data;
                this.total = res.total;
            } else {
                this.messageData = [];
                this.total = 0;
            }
        }));
    //   }
    }

    },

}
</script>

<style scoped>
#Message {
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
.message_content {
    width: 75%;
    background: #fff;
    opacity: 0.9;
    border-radius: 5px;
    margin-bottom: 30px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #000000 0px 0px 10px;
    display: inline-block;
}
.message_new {
    margin-bottom: 60px;
}
.info_input {
    display: inline-block;
}
.space {
    width: 1.3%;
    display: inline-block;
}
.m_comment_list {
    border: 1px solid rgba(34,36,38,.15);
    border-top: 2px solid #00B5AD;
    padding: 14px;
    box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
    border-radius: 5px;
}
.comment_list_title {
    margin-top: 0;
    border-bottom: 1px solid #dddfde;
    text-align: left;
}
.m_comment_list .comment {
    margin-top: 14px;
    padding-top: 5px;
}
.m_comment_list .comment .avatar {
    height: 40px;
    width: 40px;
    margin-top: 5px;
    border-radius: 3px;
    float: left;
    vertical-align: top;
}
.m_comment_list .comment .avatar img {
    height: 40px;
    width:40px;
    border-radius: 3px;
    object-fit: cover;
}
.m_comment_list .comment .content {
    text-align: left;
    margin-left: 59px;
    position: relative;
    display: block;
}
.m_comment_list .comment .content .author {
    text-decoration: none;
    color: rgba(0,0,0,.87);
    font-weight: 700;
    display: inline-block;
}
.m_comment_list .comment .content a :hover {
    color: #4183C4;
}
.m_comment_list .comment .content .metadata {
    display: inline-block;
    margin-left: 10px;
    color: rgba(0,0,0,.4);
    font-size: .875em;
}
.m_comment_list .comment .content .text {
    margin: 5px 0 10px;
}

.m_comment_list .comment .content .reply {
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
    display: inline-block;
    margin: 0 .75em 0 0;
    color: rgba(0,0,0,.4);
}
.m_comment_list .comment .comment_child {
    margin: -21px 0 -14px 20px;
    padding: 20px  0 28px 39px;
    border-left: 1px solid  #dddfde;
}
.m_comment_list .comment .content .author_tag {
    display: inline-block;
    padding: 2px;
    margin: 0 10px 0 5px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 3px;
    color: #00B5AD;
    border: 1px solid #00B5AD;
}
.m_comment_list .comment .content .mteal {
    color: #00B5AD;
    font-weight: 700;
}
.m_submit_buttom {
    background: #00B5AD;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
    margin-right: 2%;
    float: right;
}
.m_submit_buttom .el-icon-edit {
    margin-right: 7px;
}
.m_page {
  background: #fff;
  border-radius: 5px;
  width: 92%;
  margin: 20px auto 0;
  padding: 10px;
  opacity: 0.9;
}
.el-form-item {
    display: inline-block;
    width: 23%;
}
.el-form-item__content {
    margin: 10px 0 0;
}
</style>