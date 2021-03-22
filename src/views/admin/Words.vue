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
              v-model="form.bookName"
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
          border
          stripe
          :data="tableData"
          style="width: 100%; min-height: 300px"
        >
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="bookSort"
            :show-overflow-tooltip="true"
            label="留言昵称"
          >
          </el-table-column>
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="邮箱"
          >
          </el-table-column>
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="个人网站"
          >
          </el-table-column>
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="留言内容"
          >
          </el-table-column>
          <el-table-column
            prop="borrowDate"
            label="留言时间"
            sortable
            column-key="date"
            :formatter="forValidityDate"
          >
          </el-table-column>
          <el-table-column
            prop="bookPub"
            :show-overflow-tooltip="true"
            label="回复内容"
          >
          </el-table-column>
          <el-table-column
            prop="borrowDate"
            label="回复时间"
            sortable
            column-key="date"
            :formatter="forValidityDate"
          >
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="160">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                disable-transitions
                class="tag-btn"
                >回 复</el-tag
              >
              <el-tag @click="cancel(scope.row,scope.$index)" type="info" class="tag-btn"
                >删 除</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  SelectSelectorHistory2,
} from "../../network/book";
import { selectHistory, selectHistoryByLike } from "../../network/history";
export default {
    name: "Words",
    data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      tableData: [], //书籍列表
      dialogFormVisible: false,
      formInline: {
        // 书籍详情模态框
        id: "",
        userId: "",
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        borrowDate: "",
        returnDate: "",
        validityDate: "",
        isreturn: 0,
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
      form: {
        // 模糊查询表单
        bookName: "",
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
  methods: {
      handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        selectHistoryByLike(
          this.form.bookName,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else if (this.queryModel === 1) {
        // 筛选查询
        SelectSelectorHistory2(
          this.formSeletor.sort,
          this.formSeletor.pub,
          this.formSeletor.status,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        selectHistory(this.currentPage, this.pageSize).then((res) => {
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
      this.currentPage = 1;
      if (this.form.bookName) {
        selectHistoryByLike(this.form.bookName).then((res) => {
          // TODO
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        selectHistory(this.currentPage, this.pageSize).then((res) => {
          console.log(res, "6595");
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    forValidityDate(row) {
      return row.validityDate ? row.validityDate : "0";
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
</style>