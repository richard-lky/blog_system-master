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
              v-model="form.noticeContent"
              placeholder="查询公告"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
          </el-form-item>
          <el-button
            type="success"
            class="publish"
            size="small"
            @click="dialogNoticeVisible = true"
            >发布新公告</el-button
          >
        </el-form>
      </div>
      <el-table
        stripe
        :data="tableData"
        style="width: 100%; min-height: 330px; margin-bottom: 15px"
      >
        <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
        <el-table-column prop="noticeId" label="ID"></el-table-column>
        <el-table-column
          prop="noticeContent"
          label="公告内容"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          sortable
          label="上传日期"
        >
        </el-table-column>
        <el-table-column label="操作" width="164">
          <template slot-scope="scope">
            <el-tag
              @click="handleClick(scope.row)"
              type="primary"
              class="tag-btn"
              >查 看</el-tag
            >
            <el-tag @click="deleteNotice(scope.row,scope.$index)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 公告详情对话框 -->
      <el-dialog title="公告" :visible.sync="dialogFormVisible">
        <div class="notice-body">
          {{ formInline.noticeContent }}
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
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加公告" :visible.sync="dialogNoticeVisible">
        <div class="notice-body">
          <el-input
            v-model="publishNotice.noticeContent"
            type="textarea"
            rows="5"
            placeholder="请输入新公告的内容"
          ></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogNoticeVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="AddNotice"
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
  ShowNotice,
  AddNotice,
  showNoticeByContent,
  deleteNotice
} from '../../network/others'
export default {
  name: "Notice",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        noticeContent: "",
        userId: "",
      },
      publishNotice: {
        noticeContent: "",
        noticeId: "",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      dialogFormVisible: false,
      dialogNoticeVisible: false,
      form: {
        noticeContent: "",
      },
      formLabelWidth: "70px",
    };
  },
  created() {
    //查询所有公告
    ShowNotice(this.currentPage, this.pageSize).then((res) => {
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
        showNoticeByContent(
          this.form.noticeContent,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } /*  else if (this.queryModel === 1) {
        // 筛选查询
        SelectSelector(
          this.formSeletor.sort,
          this.formSeletor.pub,
          this.formSeletor.isreturn,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res;
          this.total = 6;
        });
      }  */ else {
        // 普通查询
        ShowNotice(this.currentPage, this.pageSize).then((res) => {
        // TODO
        console.log(res);
        this.tableData = res.data;
        this.total = res.total;
      });
      }
    },
    deleteNotice(row,index) {
      //注销禁用
      this.$confirm("此操作将删除这条公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteNotice(row.noticeId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowNotice(this.currentPage, this.pageSize).then((res) => {
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
      if (this.form.noticeContent) {
        showNoticeByContent(
          this.form.noticeContent,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          console.log("6262*",res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowNotice(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    //添加公告
    AddNotice() {
      AddNotice(this.publishNotice);
      this.dialogNoticeVisible = false;
      console.log(this.publishNotice);
      this.$message({
        type: "success",
        message: "发布成功!",
      });
      //添加后更新数据
      ShowNotice(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log(res);
      this.tableData = res.data;
      this.total = res.total;
    });
    },
  },
  mounted() {
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
  padding: 30px 15px;
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
</style>