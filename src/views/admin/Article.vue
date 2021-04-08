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
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <el-select v-model="formSeletor.sort" placeholder="标签">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                v-for="item in tagsData"
                :key="item.id"
                :label="item.tagName"
                :value="item.tagsName"
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
              v-model="form.bookName"
              placeholder="输入标题，宁少字，不多字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            <el-button
              type="success"
              class="publish"
              size="small"
              @click="dialogNewBookVisible = true"
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
  SelectFuzzy,
  DeleteBook,
  saveBook,
  updateBook,
  uploadImg,
} from "../../network/book";
import {
  ArticleShow,
  ShowCategory,

} from '../../network/article'
import {
  ShowTagsAll,
  ShowArticleByCategoryAndTags,

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
        // 书籍详情模态框
        id: "",
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "",
        bookRecord: "",
        bookIntroduce: "",
        bookImg: require("../../assets/img/avatar.png"),
        isreturn: 0,
      },
      formNewBook: {
        // 添加书籍模态框
        bookId: "",
        bookName: "",
        bookAuthor: "",
        bookPub: "",
        bookSort: "武侠",
        bookIntroduce: "",
        bookImg: "",
        file: "",
      },
      tableData: [], //书籍列表

      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      dialogNewBookVisible: false,
      formInlineIsreturn: "0",
      total: 0,
      bookSorts: [],
      bookPubs: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        // 模糊查询表单
        bookName: "",
      },
      formSeletor: {
        // 筛选表单
        sort: "所有"
      },
      formLabelWidth: "70px",
      bookImgUrl: "",
      defualtPic: require("../../assets/img/avatar.png"),
      imageFile: "",
      imgUrl: "",



      articleData: [],
      articleState: true,
      categoryData: [],
      tagsData: [],
    };
  },
  methods: {
    indexMethod(index) {
        let curpage = this.currentPage;
        let limitpage = this.pageSize;
        return(index + 1) + (curpage - 1)*limitpage;
      },
    imgInput(even) {
      // this.imageUrl = event.target.value;
      let $target = even.target || even.srcElement;
      let file = $target.files[0];
      console.log(file, "52654");
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.formNewBook.bookImg = res.result;
      };
      reader.readAsDataURL(file);
      this.imageFile = file;
    },
    imgReplace(even) {
      let $target = even.target || even.srcElement;
      let file = $target.files[0];
      console.log(file, "5555");
      var reader = new FileReader();
      reader.onload = (data) => {
        let res = data.target || data.srcElement;
        this.formInline.bookImg = res.result;
      };
      reader.readAsDataURL(file);
    },
    defualtImg() {
      this.bookImgUrl = this.defualtPic;
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
        SelectFuzzy(this.form.bookName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log("****");
            this.tableData = res.data;
            this.total = res.total;
          }
        );
      } else if (this.queryModel === 1) {
        // 筛选查询
        ShowArticleByCategoryAndTags(
          this.formSeletor.sort,
          this.formSeletor.pub,
          "所有",
          this.currentPage,
          this.pageSize
        ).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
      } else {
        // 普通查询
        ArticleShow(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
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
      if (this.form.bookName) {
        SelectFuzzy(this.form.bookName).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ArticleShow(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    onSubmitSeletor() {
      //筛选查询

      this.currentPage = 1;
      ShowArticleByCategoryAndTags(
        this.formSeletor.sort,
        this.formSeletor.pub,
        this.formSeletor.status
      ).then((res) => {
        // TODO
        this.tableData = res.data;
        this.total = res.total;
      });
      console.log(this.formSeletor);
      this.queryModel = 1;
    },
    cancel(row,index) {
      //删除书籍
      this.$confirm("此操作将删除这本书籍数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          DeleteBook(row.bookId);
          this.tableData.splice(index,1);
          ArticleShow(this.currentPage, this.pageSize).then((res) => {
            // TODO
            this.tableData = res.data;
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
      this.dialogNewBookVisible = false;
      this.formNewBook.bookSort = this.formSeletor.sort;
      this.formNewBook.bookPub = this.formSeletor.pub;
      console.log(this.formNewBook, "5***4");
      this.formNewBook.bookImg = "";
      let file = new FormData(); // 创建form对象
      file.append("file", this.imageFile); // 通过append向form对象添加数据
      // let param = new FormData(); // 创建form对象
      // param.append("bookAuthor", this.formNewBook.bookAuthor);
      // param.append("bookIntroduc", this.formNewBook.bookIntroduc);
      // param.append("bookName", this.formNewBook.bookName);
      // param.append("bookPub", this.formNewBook.bookPub);
      // param.append("bookSort", this.formNewBook.bookSort);
      // console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      uploadImg(file);
      console.log(file, "5---4");
      saveBook(this.formNewBook);
      console.log(this.formNewBook, "5***4");
      // console.log(param, "998");
      this.$message({
        type: "success",
        message: "发布成功!",
      });
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