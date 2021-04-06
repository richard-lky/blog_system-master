<template>
  <div :class="{ 'content-box': true, 'content-collapse': collapse }">
    <div class="content">
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item>
            <el-input
              v-model="form.woredsName"
              placeholder="请输入留言内容"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table
          stripe
          :data="tableData"
          style="width: 100%; min-height: 300px"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="wordsId"
            :show-overflow-tooltip="true"
            label="评论ID"
          >
          </el-table-column>
          <el-table-column
            prop="wordsName"
            :show-overflow-tooltip="true"
            label="留言昵称"
          >
          </el-table-column>
          <el-table-column
            prop="wordsMail"
            :show-overflow-tooltip="true"
            label="邮箱"
          >
          </el-table-column>
          <el-table-column
            prop="wordsWebsite"
            :show-overflow-tooltip="true"
            label="个人网站"
          >
          </el-table-column>
          <el-table-column
            prop="wordsContent"
            :show-overflow-tooltip="true"
            label="留言内容"
          >
          </el-table-column>
          <el-table-column
            prop="wordsTime"
            label="留言时间"
            sortable
            width="145"
            column-key="date"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            label="回复者"
          >
          <template slot-scope="scope"> {{scope.row.replyName  ?scope.row.replyName : '暂无回复'}} </template>
          </el-table-column>
          <el-table-column
            prop="replyContent"
            :show-overflow-tooltip="true"
            label="回复内容"
          ><template slot-scope="scope"> {{scope.row.replyContent  ?scope.row.replyContent : '暂无回复'}} </template>
          </el-table-column>
          <el-table-column
            label="回复时间"
            sortable
            width="145"
            :show-overflow-tooltip="true"
            column-key="date"
          ><template slot-scope="scope"> {{scope.row.replyTime  ?scope.row.replyTime : '暂无回复'}} </template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="160">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                disable-transitions
                class="tag-btn"
                >回 复</el-tag>
              <el-tag @click="deleteWord(scope.row,scope.$index)" type="info" class="tag-btn"
                >删 除</el-tag>
              
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 评论详情对话框 -->
      <el-dialog title="评论详情" :visible.sync="dialogFormVisible">
        <div class="dialog_input"> 
          <label for="name">头像地址:</label>
          <el-input
              v-model="formReply.replyImg">
            </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">回复昵称:</label>
          <el-input
            v-model="formReply.replyName">
          </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">回复内容:</label>
          <el-input
              v-model="formReply.replyContent"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}">
            </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="addWordsReply()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 分页 -->
      <div class="page">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ShowMessageAll,
  SelectByWordNameOrContent,
  addWordsReply,
  DeleteWordReplyByReplyId
} from '../../network/message.js'
export default {
    name: "Words",
    data() {
    return {
      visible: false,
      collapse: true,
      tagName: "",
      icon: "",
      tableData: [], //书籍列表
      dialogFormVisible: false,
      formInline: {
        // 书籍详情模态框
        replyContent: "",
        replyName: "",
        replyImg: "",
        innkeeper: 1,
        wordsId: ""
      },
      formReply: {
        replyContent: "",
        replyName: "",
        replyImg: "",
        innkeeper: 1,
        wordsId: ""
      },
      currentPage: 1,
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        // 模糊查询表单
        woredsName: "",
        woredsContent: ""
      },
      formSeletor: {
        // 筛选表单
        sort: "所有",
        pub: "所有",
        status: "所有",
      },
      formLabelWidth: "70px",
    };
  },

  created() {
    ShowMessageAll(this.currentPage, this.pageSize).then((res => {
      console.log(res)
      if(res) {
        this.tableData = res.data;
        this.total = res.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    }));
  },
  methods: {
    indexMethod(index) {
        let curpage = this.currentPage;
        let limitpage = this.pageSize;
        return(index + 1) + (curpage - 1)*limitpage;
      },
      handleClick(row) {
      console.log(row);
      this.formReply.wordsId = row.wordsId;
      this.dialogFormVisible = true;
      this.formInline = row;
    },
      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectByWordNameOrContent(
          this.form.woredsName,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        ShowMessageAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    onSubmitFuzzy() {
      //模糊查询
      // this.currentPage = 1;
      if (this.form.woredsName) {
        SelectByWordNameOrContent(this.form.woredsName, this.currentPage, this.pageSize).then((res) => {
          // TODO
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowMessageAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res, "6595");
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    addWordsReply() {
      addWordsReply(this.formReply);
      this.dialogFormVisible = false;
      console.log(this.formReply);
      ShowMessageAll(this.currentPage, this.pageSize).then((res) => {
        // TODO
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
      this.$message({
        type: "success",
        message: "发布成功!",
      });
    },
    deleteWord(row,index) {
      //删除
      this.$confirm("此操作将删除这条回复信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DeleteWordReplyByReplyId(row.replyId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowMessageAll(this.currentPage, this.pageSize).then((res) => {
            // TODO
            console.log(res);
            this.tableData = res.data;
            this.total = res.total;
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  }
}
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
.container .content-box .crumbs {
  margin: 10px 0;
  text-align: left;
  color: #606266;
}
.container .content-box .content {
  height: 100%;
  padding: 10px 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  text-align: center;
}
.page {
  text-align: center;
}
.tag-btn {
  margin: 0 3px;
}
.space{
  display: inline-block;
  margin: 0 2%;
}
.dialog_input{
  margin-top: 10px;
}
.option_btn {
  height: 32px;
  line-height: 30px;
  width: 52.6px;
  padding: 0 10px;
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
.option_btn:hover, .option_btn:active{
  background-color: #f4f4f5;
  border-color: #e9e9eb;
  color: #909399;
}
</style>