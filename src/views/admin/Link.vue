<template>
  <div :class="{ 'content-box': true, 'content-collapse': collapse }">
    <div class="content">
      <div class="search">
        <el-button
          type="success"
          class="publish"
          size="small"
          @click="dialogNoticeVisible = true"
          >添加新链接</el-button
        >
      </div>
      <el-table
          stripe
        :data="tableData"
        style="width: 100%; min-height: 330px; margin-bottom: 15px"
      >
        <el-table-column type="index" :index="indexMethod" label="序号">
        </el-table-column>
        <el-table-column prop="linksId" label="ID">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="linksName"
          label="友链名称"
        ></el-table-column>
        <el-table-column prop="linksImg" :show-overflow-tooltip="true" label="头像链接">
        </el-table-column>
        <el-table-column prop="linksDescribe" :show-overflow-tooltip="true" label="描述">
        </el-table-column>
        <el-table-column prop="linksUrl" :show-overflow-tooltip="true" label="网址">
        </el-table-column>
        <el-table-column
          prop="addTime"
          sortable
          label="添加日期"
          width="150"
        >
        </el-table-column>
        <!-- <el-table-column prop="userName" label="是否可用">
          <template v-slot="scoped">
            <el-switch
              v-model="scoped.row.articleState"
              active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-tag
              @click="handleClick(scope.row)"
              type="primary"
              class="tag-btn"
              >修 改</el-tag
            >
            <el-tag @click="deleteLinks(scope.row,scope.$index)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改对话框 -->
      <el-dialog title="修改友链信息" :visible.sync="dialogFormVisible">
        <div class="notice-body">
          <label for="name">友链名称:</label>
          <el-input
            placeholder="友链名称"
            v-model="formInline.linksName"
            clearable>
          </el-input>
          <div class="space"></div>
          <label for="name">头像链接:</label>
          <el-input
            placeholder="头像链接"
            v-model="formInline.linksImg"
            clearable>
          </el-input>
          <div class="space"></div>
          <label for="name">网址:</label>
          <el-input
            placeholder="网址"
            v-model="formInline.linksUrl"
            clearable>
          </el-input>
          <div class="space"></div>
          <label for="name">描述:</label>
          <el-input
            placeholder="描述"
            v-model="formInline.linksDescribe"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}">
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="updateLinks"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加链接" :visible.sync="dialogNoticeVisible">
        <div class="notice-body">
          <el-input
            placeholder="请输入友链名称"
            v-model="publishLink.linksName"
            clearable>
          </el-input>
          <div class="space"></div>
          <el-input
            placeholder="请输入头像链接"
            v-model="publishLink.linksImg"
            clearable>
          </el-input>
          <div class="space"></div>
          <el-input
            placeholder="请输入网址"
            v-model="publishLink.linksUrl"
            clearable>
          </el-input>
          <div class="space"></div>
          <el-input
            placeholder="请输入描述"
            v-model="publishLink.linksDescribe"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            clearable>
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogNoticeVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="addLink"
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
  ShowFriendsAll,
  addLink,
  updateLinks,
  deleteLinks,

} from '../../network/others'
export default {
  name: "Link",
  data() {
    return {
      collapse: true,
      tagName: "",
      formInline: {
        linksId: '',
        linksName: "",
        linksImg: "",
        linksDescribe: "",
        linksUrl: "",
      },
      publishLink: {
        linksName: "",
        linksImg: "",
        linksDescribe: "",
        linksUrl: "",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,
      dialogNoticeVisible: false,
      form: {
        noticeContent: "",
      },
      formLabelWidth: "70px",
      isSwitch: true,
    };
  },
  created() {
    ShowFriendsAll(this.currentPage, this.pageSize).then((res) => {
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
      // 普通查询
      ShowFriendsAll(this.currentPage, this.pageSize).then((res) => {
        console.log(res);
        // TODO
        this.tableData = res.data;
        this.total = res.total;
        // this.total = res.total
      });
    },
    //添加链接
    addLink() {
      addLink(this.publishLink);
      this.dialogNoticeVisible = false;
      console.log(this.publishLink);
      ShowFriendsAll(this.currentPage, this.pageSize).then((res) => {
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
    updateLinks() {
      //修改友链信息
      this.dialogFormVisible = false;
      // this.formInline.addTime = this.$moment(
      //   new Date(this.formInline.addTime).getTime()
      // ).format("YYYY-MM-DD");
      this.formInline.addTime = null;
      updateLinks(this.formInline);
    },
    deleteLinks(row,index) {
      //删除
      this.$confirm("此操作将删除这条友链, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteLinks(row.linksId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowFriendsAll(this.currentPage, this.pageSize).then((res) => {
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
  margin-bottom: 10px;
}
.container .content-box .content .search .publish {
  margin-left: 50px;
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
.tag-btn {
  cursor: pointer;
  margin-right: 10px;
}
.page {
  text-align: center;
}
.space {
  margin-top: 15px;
}
</style>