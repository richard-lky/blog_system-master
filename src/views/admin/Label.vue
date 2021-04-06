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
              v-model="form.tagsName"
              placeholder="查询标签"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
          </el-form-item>
          <el-button
            type="success"
            class="publish"
            size="small"
            @click="dialogTagsVisible = true"
            >添加新标签</el-button
          >
        </el-form>
      </div>
      <el-table
          stripe
        :data="tableData"
        style="width: 100%; min-height: 330px; margin-bottom: 15px"
      >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
          >
          </el-table-column>
         <el-table-column
          prop="tagsId"
          label="标签ID"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="tagsName"
          label="标签名称"
        ></el-table-column>
        <el-table-column
          prop="tagsTime"
          sortable
          label="创建日期"
        >
        </el-table-column>
        <el-table-column label="操作" width="154">
          <template slot-scope="scope">
            <el-tag
              @click="handleClick(scope.row)"
              type="primary"
              class="tag-btn"
              >修 改</el-tag
            >
            <el-tag @click="deleteTags(scope.row,scope.$index)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改标签详情对话框 -->
      <el-dialog title="修改标签" :visible.sync="dialogFormVisible">
        <div class="dialog_input"> 
          <label for="name">标签名称:</label>
          <el-input
              v-model="formInline.tagsName" placeholder="请输入标签名称">
            </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateTags"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新标签对话框 -->
      <el-dialog title="添加标签" :visible.sync="dialogTagsVisible">
        <div class="dialog_input"> 
          <label for="name">标签名称:</label>
          <el-input
              v-model="publishTags.tagsName" placeholder="请输入标签名称">
            </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogTagsVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="AddTags"
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
            layout="total, prev, pager, next"
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
  ShowTagsAll,
  AddTags,
  ShowTagsBylike,
  deleteTags,
  updateTags
} from '../../network/aside.js'
export default {
  name: "Lebel",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        tagsId: "",
        tagsName: "",
        tagsTime: ""
      },
      publishTags: {
        tagsName: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      dialogTagsVisible: false,
      form: {
        tagsName: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    ShowTagsAll(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log(res);
      this.tableData = res.data;
      this.total = res.total;
    });
  },
  methods: {
    isCollapse(val) {
      this.collapse = val;
    },
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
        ShowTagsBylike(
          this.form.tagsName,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      }  else {
        // 普通查询
        ShowTagsAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    updateTags(){
      this.formInline.tagsTime=null;
      updateTags(this.formInline);
      this.dialogFormVisible = false;
      this.$message({
          message: '修改成功',
          type: 'success'
        });
    },
    deleteTags(row,index) {
      //注销禁用
      this.$confirm("此操作将删除这条标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTags(row.tagsId);
          this.tableData.splice(index,1);
          ShowTagsAll(this.currentPage, this.pageSize).then((res) => {
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
    onSubmitFuzzy() {
      //模糊查询
      // this.currentPage = 1;
      if (this.form.tagsName) {
        ShowTagsBylike(this.form.tagsName).then((res) => {
          // TODO
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowTagsAll(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    AddTags() {
      AddTags(this.publishTags);
      this.dialogTagsVisible = false;
      console.log(this.publishTags);
      this.$message({
        type: "success",
        message: "发布成功!",
      });
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      console.log(val);
      this.tagName = val;
    });
  },
};
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

.content-box .content {
  height: 100%;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.container .content-box .content .search {
  text-align: center;
}
.container .content-box .content .search .publish {
  margin-left: 50px;
}
.content-box .content .notice-body {
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #ddd;
}
.content-box .content .notice-body .notice-info {
  text-align: right;
  margin: 10px 15px 0 0;
}
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.page {
    text-align: center;
}
.dialog_input{
  margin: 10px auto;
  width: 90%;
}
</style>