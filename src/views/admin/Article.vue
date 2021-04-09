<template>
  <div :class="{ 'content-box': true, 'content-collapse': collapse }">
    <div class="content">
      <div class="screen">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="分类">
            <el-select v-model="formSeletor.sort" placeholder="分类">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                v-for="item in categoryData"
                :key="item.id"
                :label="item.categoryName"
                :value="item.categoryId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="formSeletor.tags" placeholder="标签">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                v-for="item in tagsData"
                :key="item.id"
                :label="item.tagsName"
                :value="item.tagsId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitSeletor">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item>
            <el-input
              v-model="form.articleTitle"
              placeholder="输入标题，宁少字，不多字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            <el-button
              type="success"
              class="publish"
              size="small"
              @click="dialogNewArticleVisible = true"
              >写文章</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table
          :data="articleData"
          stripe
          highlight-current-row
          style="width: 100%; min-height: 300px;"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="articleTitle"
            :show-overflow-tooltip="true"
            label="文章标题"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创作日期"
            sortable
            column-key="date"
          >
          </el-table-column>
          <el-table-column prop="categoryName" label="文章分类"> </el-table-column>
          <el-table-column prop="tagsName" label="标签分类"> </el-table-column>
          <el-table-column label="是否发布"><template slot-scope="scope"> {{scope.row.articleState == true ?'已发布' : '草稿'}} </template> </el-table-column>
          <el-table-column prop="articleId" label="发布/撤销">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.articleState"
              @change= "change(scoped.row.articleId,scoped.row.articleState)" 
              active-color="#13ce66">
            </el-switch>
          </template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="195">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="success"
                disable-transitions
                class="tag-btn"
                >编辑</el-tag
              >
              <el-tag @click="deleteArticle(scope.row,scope.$index)" type="info" class="tag-btn"
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
  updateBook,
} from "../../network/book";
import {
  ArticleShow,
  ShowCategory,
  ShowArticleByCategoryAndTags,
  ShowArticleByLike,
  deleteArticle,
  changeToDraft
} from '../../network/article'
import {
  ShowTagsAll,
} from '../../network/aside'
export default {
  name: "Article",
  components: {},
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      formInline: {
        // 文章详情模态框
        id: "",
        bookId: "",
        articleTitle: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        bookRecord: "",
        bookIntroduce: "",
        bookImg: require("../../assets/img/avatar.png"),
        isreturn: 0,
      },
      formNewBook: {
        // 添加文章模态框
        bookId: "",
        articleTitle: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "武侠",
        bookIntroduce: "",
        bookImg: "",
        file: "",
      },
      articleData: [], //文章列表

      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      dialogNewArticleVisible: false,
      formInlineIsreturn: "0",
      total: 0,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        // 模糊查询表单
        articleTitle: "",
      },
      formSeletor: {
        // 筛选表单
        sort: "所有",
        tags: "所有"
      },



      articleState: true,
      categoryData: [],
      tagsData: [],
    };
  },
  methods: {
    //表格序号
    indexMethod(index) {
        let curpage = this.currentPage;
        let limitpage = this.pageSize;
        return(index + 1) + (curpage - 1)*limitpage;
      },
      change(articleId,value){
        console.log("改变了",value)
        changeToDraft(articleId,value);
      },
    isCollapse(val) {
      this.collapse = val;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        ShowArticleByLike(this.form.articleTitle, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log("****");
            this.articleData = res.data;
            this.total = res.total;
          }
        );
      } else if (this.queryModel === 1) {
        // 筛选查询
        ShowArticleByCategoryAndTags(
          this.formSeletor.sort,
          this.formSeletor.tags,
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.articleData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        ArticleShow(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.articleData = res.data;
          this.total = res.total;
        });
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;
      // this.formInlineIsreturn = row.isreturn
    },
    onSubmitFuzzy() {
      //模糊查询
      this.currentPage = 1;
      if (this.form.articleTitle) {
        ShowArticleByLike(this.form.articleTitle).then((res) => {
          // TODO
          this.articleData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ArticleShow(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.articleData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    onSubmitSeletor() {
      //筛选查询
      ShowArticleByCategoryAndTags(
        this.formSeletor.sort,
        this.formSeletor.tags,
        this.currentPage, 
        this.pageSize
      ).then((res) => {
      console.log(res);
        // TODO
        this.articleData = res.data;
        this.total = res.total;
      });
      this.queryModel = 1;
    },
    deleteArticle(row,index) {
      //删除文章
      this.$confirm("此操作将删除这条文章数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle(row.articleId);
          this.articleData.splice(index,1);
          ArticleShow(this.currentPage, this.pageSize).then((res) => {
            // TODO
            this.articleData = res.data;
            console.log(res.data, "*-*-*-*");
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
    addBook() {
      
    },
    updateBookInfo() {
      //修改图书信息
      this.dialogFormVisible = false;
      this.formInline.bookRecord = this.$moment(
        new Date(this.formInline.bookRecord).getTime()
      ).format("YYYY-MM-DD");
      updateBook(this.formInline);
    },
  },
  created() {
    //从这里开始
    ArticleShow(this.currentPage, this.pageSize).then((res) => {
      console.log(res,"----");
      if (res) {
        this.articleData = res.data;
        this.total = res.total;
      } else {
        this.articleData = [];
        this.total = 0;
      }
    });

    ShowCategory().then((res => {
    console.log("898989",res.data);
    if(res){
      this.categoryData = res.data;
    } else {
      this.categoryData = [];
    }
    }));
    ShowTagsAll().then((res => {
      console.log("1111",res.data);
      if(res){
        this.tagsData = res.data;
      } else {
        this.tagsData = [];
      }
    }))

  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val) => {
      this.tagName = val;
    });
    this.$eventBusiIcon.$on("eventBusName", (val, index) => {
      console.log(val);
      this.icon = index;
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
.screen {
  display: inline-block;
}
.container .content-box .content .search {
  padding-left: 10px;
  display: inline-block;

}
.container .content-box .content .search .publish {
  margin-left: 50px;
}
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.book-info {
  width: 65%;
  display: inline-block;
}
.book-img {
  display: inline-block;
  width: 26%;
  height: 40%;
  text-align: center;
  vertical-align: center;
  line-height: 222px;
  margin-left: 25px;
  border: 1px solid #ddd;
  position: absolute;
}




.add-book-img {
  display: inline-block;
  width: 26%;
  height: 45%;
  text-align: center;
  vertical-align: center;
  line-height: 222px;
  margin-left: 25px;
  border: 1px solid #ddd;
  position: absolute;
}
.lable-img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: block;
}

.img-icon {
  font-size: 40px;
  cursor: pointer;
}
.img-input {
  display: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
.add-book-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-img .avatar-uploader {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.page {
  text-align: center;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>