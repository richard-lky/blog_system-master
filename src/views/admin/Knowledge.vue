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
            <el-select v-model="formSeletor.status" placeholder="分类">
              <el-option label="所有" value="所有"></el-option>
              <el-option
                :label="item.resourceCategory"
                :value="item.resourceCategory"
                v-for="item in categoryData"
                :key="item.id"
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
              v-model="form.resourceName"
              placeholder="输入资源名字，宁少字，不多字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFuzzy">查询</el-button>
            <el-button
              type="success"
              class="publish"
              size="small"
              @click="dialogNewResourceVisible = true"
              >添加资源</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="content-body">
        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%; min-height: 300px;"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="resourceId"
            :show-overflow-tooltip="true"
            label="ID"
          >
          </el-table-column>
          <el-table-column
            prop="resourceName"
            :show-overflow-tooltip="true"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            prop="resourceCategory"
            :show-overflow-tooltip="true"
            label="类别"
          >
          </el-table-column>
          <el-table-column
            prop="resourceImg"
            :show-overflow-tooltip="true"
            label="照片地址"
          >
          </el-table-column>
          <el-table-column prop="resourceDescribe" :show-overflow-tooltip="true" label="简介"> </el-table-column>
          <el-table-column
            prop="createTime"
            label="添加日期"
            sortable
            column-key="date"
            width="170"
          >
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="160">
            <template slot-scope="scope">
              <el-tag
                @click="handleClick(scope.row)"
                type="primary"
                disable-transitions
                class="tag-btn"
                >编 辑</el-tag
              >
              <el-tag @click="deleteResource(scope.row,scope.$index)" type="info" class="tag-btn"
                >删 除</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改资料对话框 -->
        <el-dialog title="书籍资料" :visible.sync="dialogFormVisible">
          <div class="notice-body">
            <label for="name">名称:</label>
            <el-input
              placeholder="名称"
              v-model="formInline.resourceName"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">类别:</label>
            <el-input
              placeholder="类别"
              v-model="formInline.resourceCategory"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">照片地址:</label>
            <el-input
              placeholder="照片地址"
              v-model="formInline.resourceImg"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">简介:</label>
            <el-input
              placeholder="简介"
              v-model="formInline.resourceDescribe"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}">
            </el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateResource">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 添加图书对话框 -->
        <el-dialog title="书籍资料" :visible.sync="dialogNewResourceVisible">
           <div class="notice-body">
            <label for="name">名称:</label>
            <el-input
              placeholder="名称"
              v-model="publishResource.resourceName"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">类别:</label>
            <el-input
              placeholder="类别"
              v-model="publishResource.resourceCategory"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">照片地址:</label>
            <el-input
              placeholder="照片地址"
              v-model="publishResource.resourceImg"
              clearable>
            </el-input>
            <div class="space"></div>
            <label for="name">简介:</label>
            <el-input
              placeholder="简介"
              v-model="publishResource.resourceDescribe"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}">
            </el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogNewResourceVisible = false">取 消</el-button>
            <el-button type="primary" @click="addResource">发 布</el-button>
          </div>
        </el-dialog>
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
  ShowResourceAll,
  addResource,
  updateResource,
  deleteResource,
  ShowResourceCategory,
  ShowResourceByCategory,
  ShowResourceByLike
} from '../../network/others.js'
export default {
  name: "Knowledge",
  components: {},
  data() {
    return {
      collapse: true,
      tagName: "",
      icon: "",
      formInline: {
        // 资源详情模态框
        resourceId: "",
        resourceCategory: "",
        resourceDescribe: "",
        resourceImg: "",
        resourceName: ""
      },
      publishResource: {
        // 添加资源模态框
        resourceId: "",
        resourceCategory: "",
        resourceDescribe: "",
        resourceImg: "",
        resourceName: ""
      },
      tableData: [], //资源列表
      currentPage: 1,
      pageSize: 10,
      dialogFormVisible: false,
      dialogNewResourceVisible: false,
      total: 0,
      categoryData: [],
      queryModel: 0, // 当前查询状态，用户分页切换，分页查询0， 筛选查询1， 模糊查询2
      form: {
        // 模糊查询表单
        resourceName: "",
      },
      formSeletor: {
        // 筛选表单
        status: "所有",
      },
    };
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      if (this.queryModel === 2) {
        //模糊查询
        ShowResourceByLike(this.form.resourceName, this.currentPage, this.pageSize).then(
          (res) => {
            // TODO
            console.log("****");
            this.tableData = res.data;
            this.total = res.total;
          }
        );
      } else if (this.queryModel === 1) {
        // 筛选查询
        ShowResourceByCategory(
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
        ShowResourceAll(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          console.log(res.data, "*-*-*-*");
          this.total = res.total;
        });
      }
    },
    handleClick(row) {
      this.dialogFormVisible = true;
      this.formInline = row;

    },
    onSubmitFuzzy() {
      //模糊查询
      // this.currentPage = 1;
      if (this.form.resourceName) {
        ShowResourceByLike(this.form.resourceName).then((res) => {
          // TODO
          this.tableData = res.data;
          this.total = res.total;
        });
        this.queryModel = 2;
      } else {
        //为空时切换普通查询
        ShowResourceAll(this.currentPage, this.pageSize).then((res) => {
          // TODO
          this.tableData = res.data;
          console.log(res.data, "*-*-*-*");
          this.total = res.total;
        });
        this.queryModel = 0;
      }
    },
    onSubmitSeletor() {
      //筛选查询

      console.log(this.formSeletor.status,"985959848**--")
      ShowResourceByCategory(
        this.formSeletor.status,this.currentPage, this.pageSize
      ).then((res) => {
        // TODO
        this.tableData = res.data;
        this.total = res.total;
      });
      console.log(this.formSeletor);
      this.queryModel = 1;
    },
    //添加
    addResource() {
      addResource(this.publishResource);
      this.dialogNewResourceVisible = false;
      console.log(this.publishResource);
      ShowResourceAll(this.currentPage, this.pageSize).then((res) => {
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
    updateResource() {
      //修改
      this.dialogFormVisible = false;
      // this.formInline.addTime = this.$moment(
      //   new Date(this.formInline.addTime).getTime()
      // ).format("YYYY-MM-DD");
      this.formInline.createTime = null;
      updateResource(this.formInline);
    },
    deleteResource(row,index) {
      //删除
      this.$confirm("此操作将删除这条友链, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteResource(row.resourceId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowResourceAll(this.currentPage, this.pageSize).then((res) => {
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
  },
  created() {
    ShowResourceAll(this.currentPage, this.pageSize).then((res) => {
      // TODO
      this.tableData = res.data;
      console.log(res.data, "*-*-*-*");
      this.total = res.total;
    });
    ShowResourceCategory().then((res) => {
      this.categoryData = res.data;
      console.log(res.data, "99999");
    });
  },
  mounted() {
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
.content-box .content .notice-body {
  padding: 0 15px;
  border-radius: 5px;
  font-size: 16px;
}
.content-box .content .notice-body .notice-info {
  text-align: right;
  margin: 10px 15px 0 0;
}
.space {
  margin-top: 15px;
}
</style>