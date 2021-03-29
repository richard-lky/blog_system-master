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
          <el-button
            type="success"
            class="publish"
            size="small"
            @click="dialogNoticeVisible = true"
            >添加新照片</el-button
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
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="photoId"
          label="ID"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="photoDescribe"
          label="照片简介"
        ></el-table-column>
        <el-table-column prop="photoUrl" :show-overflow-tooltip="true" label="照片地址">
        </el-table-column>
        <el-table-column
          prop="createTime"
          sortable
          label="添加日期"
          width="150"
        >
        </el-table-column>
        <el-table-column  label="操作" width="150">
          <template slot-scope="scope">
            <el-tag
              @click="handleClick(scope.row)"
              type="primary"
              class="tag-btn"
              >修 改</el-tag
            >
            <el-tag @click="deletePhoto(scope.row,scope.$index)" type="info" class="tag-btn"
              >删 除</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改照片墙对话框 -->
      <el-dialog title="照片墙" :visible.sync="dialogFormVisible">
        <div class="notice-body">
          <label for="name">照片地址:</label>
          <el-input
            placeholder="照片地址"
            v-model="formInline.photoUrl"
            clearable>
          </el-input>
          <div class="space"></div>
          <label for="name">照片简介:</label>
          <el-input
            placeholder="照片简介"
            v-model="formInline.photoDescribe"
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
            @click="updatePhoto"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 添加新公告对话框 -->
      <el-dialog title="添加链接" :visible.sync="dialogNoticeVisible">
        <div class="notice-body">
          <label for="name">照片地址:</label>
          <el-input
            placeholder="照片地址"
            v-model="publishPhoto.photoUrl"
            clearable>
          </el-input>
          <div class="space"></div>
          <label for="name">照片简介:</label>
          <el-input
            placeholder="照片简介"
            v-model="publishPhoto.photoDescribe"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}">
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogNoticeVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" size="small" @click="addPhoto"
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
  ShowPhotoAll,
  addPhoto,
  updatePhoto,
  deletePhoto
} from '../../network/others'
export default {
  name: "Picture",
  data() {
    return {
      collapse: true,
      formInline: {
        photoDescribe: "",
        photoUrl: "",
      },
      publishPhoto: {
        photoDescribe: "",
        photoUrl: "",
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
    ShowPhotoAll(this.currentPage, this.pageSize).then((res) => {
      // TODO
      console.log("9959++++",res);
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
        ShowPhotoAll(this.currentPage, this.pageSize).then((res) => {
          console.log(res);
          // TODO
          this.tableData = res.data;
          this.total = res.total;
          // this.total = res.total
        });
    },
    addPhoto() {
      addPhoto(this.publishPhoto);
      this.dialogNoticeVisible = false;
      console.log(this.publishPhoto);
      ShowPhotoAll(this.currentPage, this.pageSize).then((res) => {
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
    updatePhoto() {
      //修改友链信息
      this.dialogFormVisible = false;
      // this.formInline.addTime = this.$moment(
      //   new Date(this.formInline.addTime).getTime()
      // ).format("YYYY-MM-DD");
      this.formInline.createTime = null;
      updatePhoto(this.formInline);
    },
    deletePhoto(row,index) {
      //删除
      this.$confirm("此操作将删除这条友链, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePhoto(row.photoId);
          console.log("+++",index)
          this.tableData.splice(index,1);  //移除对应索引位置的数据
          ShowPhotoAll(this.currentPage, this.pageSize).then((res) => {
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
  padding: 10px 15px;
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