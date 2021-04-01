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
              v-model="Comment.commentContent"
              placeholder="请输入所属文章或评论内容"
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
            prop="commentId"
            :show-overflow-tooltip="true"
            label="评论ID"
          >
          </el-table-column>
          <el-table-column
            prop="articleTitle"
            :show-overflow-tooltip="true"
            label="所属文章"
          >
          </el-table-column>
          <el-table-column
            prop="commentName"
            :show-overflow-tooltip="true"
            label="评论者"
          >
          </el-table-column>
          <!-- <el-table-column
            prop="commentContent"
            :show-overflow-tooltip="true"
            label="评论内容"
          >
          </el-table-column> -->
          <el-table-column
            prop="commentTime"
            label="评论时间"
            sortable
            column-key="date"
            width="145"
            >
          <!-- :formatter="forValidityDate" -->
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            label="回复者"
          >
          <template slot-scope="scope"> {{scope.row.replyName  ?scope.row.replyName : '暂无回复'}} </template> 
          </el-table-column>
          <!-- <el-table-column
            :show-overflow-tooltip="true"
            label="回复内容"
          >
          <template slot-scope="scope"> {{scope.row.replyContent  ?scope.row.replyContent : '暂无回复'}} </template>
          </el-table-column> -->
          <el-table-column
            label="回复时间"
            sortable
            width="145"
            column-key="date"
          >
          <template slot-scope="scope"> {{scope.row.replyTime  ?scope.row.replyTime : '暂无回复'}} </template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="160">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                disable-transitions
                class="tag-btn"
                >详 情</el-tag
              >
              <el-tag @click="deleteComment(scope.row,scope.$index)" type="info" class="tag-btn"
                >删 除</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 评论详情对话框 -->
      <el-dialog title="评论详情" :visible.sync="dialogFormVisible">
        <div class="dialog_input"> 
          <label for="name">评论ID:</label>
          <el-input
              v-model="formInline.commentId"
              disabled>
            </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">所属文章:</label>
          <el-input
            v-model="formInline.articleTitle"
            disabled>
          </el-input>
        </div>
        <div class="dialog_input"> 
          <label for="name">评论者:</label>
          <el-input
              v-model="formInline.commentName"
              disabled>
            </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">回复者:</label>
          <el-input
            v-model="formInline.replyName"
            disabled>
          </el-input>
        </div>
        <div class="dialog_input"> 
          <label for="name">评论时间:</label>
          <el-input
              v-model="formInline.commentTime"
              disabled>
            </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">回复时间:</label>
          <el-input
            v-model="formInline.replyTime"
            disabled>
          </el-input>
        </div>
        <div class="dialog_input"> 
          <label for="name">评论内容:</label>
          <el-input
              v-model="formInline.commentContent"
              type="textarea"
              disabled
              :autosize="{ minRows: 2, maxRows: 6}">
            </el-input>
        </div>
        <div class="space"></div>
        <div class="dialog_input"> 
          <label for="name">回复内容:</label>
          <el-input
            v-model="formInline.replyContent"
            type="textarea"
            disabled
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
            @click="dialogFormVisible = false"
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
  ShowCommentAll,
  SelectByArticleTitleOrContent,
  deleteComment
} from '../../network/comment.js'
export default {
    name: "Comment",
    data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      tableData: [], //书籍列表
      dialogFormVisible: false,
      formInline: {
        
      },
      formBook: {
        bookId: "",
      },
      currentPage: 1,
      pageSize: 5,
      formInlineIsreturn: "0",
      total: 8,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      Comment: {
        // 模糊查询表单
        commentContent: "",
        articleTitle: ""
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
    ShowCommentAll(this.currentPage,this.pageSize).then((res => {
      console.log(res)
      if(res) {
        this.tableData = res.data;
        this.total = res.total;
      } else {
        this.tableData = [];
        this.total = 0;
      }
    }))
  },
  methods: {
      indexMethod(index) {
        let curpage = this.currentPage;
        let limitpage = this.pageSize;
        return(index + 1) + (curpage - 1)*limitpage;
      },
      handleClick(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.formInline = row;
    },
      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        SelectByArticleTitleOrContent(
          this.Comment.commentContent,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        ShowCommentAll(this.currentPage, this.pageSize).then((res) => {
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
      if (this.Comment.commentContent) {
        SelectByArticleTitleOrContent(this.Comment.commentContent,this.currentPage, this.pageSize).then((res) => {
          // TODO
          console.log("模糊查询",res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowCommentAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res, "6595");
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    deleteComment(row,index) {
      //删除
      this.$confirm("此操作将删除这条评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(row.commentId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowCommentAll(this.currentPage, this.pageSize).then((res) => {
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
.tag-btn{
  margin: 0 3px;
}
.dialog_input{
  width: 48%;
  margin-top: 10px;
  display: inline-block;
}
.space{
  display: inline-block;
  margin: 0 2%;
}
</style>