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
              v-model="form.categoryName"
              placeholder="查询分类"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
          </el-form-item>
          <el-button
            type="success"
            class="publish"
            size="small"
            @click="dialogCategoryVisible = true"
            >添加新分类</el-button
          >
        </el-form>
      </div>
      <el-table
        :data="tableData"
          stripe
        style="width: 100%; min-height: 330px; margin-bottom: 15px"
      >
        <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
          >
          </el-table-column>
         <el-table-column
          prop="categoryId"
          label="分类ID"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="categoryName"
          label="分类名称"
        ></el-table-column>
        <el-table-column
          prop="categoryTime"
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
            <el-tag @click="deleteCategory(scope.row,scope.$index)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 公告详情对话框 -->
      <el-dialog title="公告" :visible.sync="dialogFormVisible">
        <div class="dialog_input"> 
          <label for="name">标签名称:</label>
          <el-input
              v-model="formInline.categoryName" placeholder="请输入标签名称">
            </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateCategory"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加公告" :visible.sync="dialogCategoryVisible">
        <div class="dialog_input"> 
          <label for="name">标签名称:</label>
          <el-input
              v-model="publishCategory.categoryName" placeholder="请输入标签名称">
            </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogCategoryVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="AddCategory"
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
  ShowCategoryAll,
  AddCategory,
  ShowCategoryBylike,
  deleteCategory,
  updateCategory
} from '../../network/category'
export default {
  name: "Sort",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        categoryName: "",
        categoryTime: "",
      },
      publishCategory: {
        categoryName: "",
        noticeCreatetime: "",
        userName: "",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogCategoryVisible: false,
      form: {
        categoryName: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    ShowCategoryAll(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log(res);
      this.tableData = res.data;
      this.total = res.total;
    });
  },
  methods: {
    indexMethod(index) {
        let curpage = this.currentPage;
        let limitpage = this.pageSize;
        return(index + 1) + (curpage - 1)*limitpage;
      },
    isCollapse(val) {
      this.collapse = val;
    },

    onSubmit() {
      console.log("submit!");
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
        ShowCategoryBylike(
          this.form.categoryName,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      }else {
        // 普通查询
        ShowCategoryAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
      }
    },
    deleteCategory(row,index) {
      //注销禁用
      this.$confirm("此操作将删除这条分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCategory(row.categoryId);
          this.tableData.splice(index,1);
          ShowCategoryAll(this.currentPage, this.pageSize).then((res) => {
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
      this.currentPage = 1;
      if (this.form.categoryName) {
        ShowCategoryBylike(this.form.categoryName).then((res) => {
          // TODO
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowCategoryAll(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    updateCategory(){
      this.formInline.categoryTime=null;
      updateCategory(this.formInline);
      this.dialogFormVisible = false;
      this.$message({
          message: '修改成功',
          type: 'success'
        });
    },
    AddCategory() {
      AddCategory(this.publishCategory);
      this.dialogCategoryVisible = false;
      console.log(this.publishCategory);
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