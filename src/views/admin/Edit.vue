<template>
    <div id="edit">
      <el-form
        :inline="true"
        class="text-form-inline"
      >
        <el-form-item>
          <el-select v-model="articleTable.categoryName" placeholder="请选择文章分类">
            <el-option
              :label="item.categoryName"
              :value="item.categoryId"
              v-for="item in categoryData"
              :key="item.sortId"
            ></el-option>
          </el-select>
          <el-select v-model="articleTable.tagsName" placeholder="请选择文章标签">
            <el-option
              :label="item.tagsName"
              :value="item.tagsId"
              v-for="item in tagsData"
              :key="item.sortId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-input
          placeholder="请输入文章标题"
          v-model="articleTable.articleTitle"
          style="width:55%;text-align: left; margin-right: 10px"
          clearable>
        </el-input>
        <!-- <el-upload
          class="upload-demo"
          action="http://localhost:8081/upload/uploadImage"
          :on-success="handleSuccess"
          multiple
          :limit="4"
          :show-file-list="false"
          :file-list="fileList">
          <el-button type="primary">上传图片</el-button>
        </el-upload> -->
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入文章概述"
          style="margin-bottom:22px"
          v-model="articleTable.articleSummary">
        </el-input>
      </el-form>
        <!--markdown编辑-->
        <mavon-editor
            v-model="content"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
            @change="change"
            :toolbars="toolbars"
            :ishljs="false"
            :toolbarsBackground="'#f9f9f9'"
            style="height: calc(100vh - 50px)"
            />
        <div class="m-submit">
            <el-button class="m-submit-buttom" type="primary" @click="publishArticle(false)" round>保存草稿</el-button>
            <el-button class="m-submit-buttom" type="success" @click="publishArticle(true)" round>发布文章</el-button>
        </div>
    </div>
</template>
<script>
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'

import {
  ShowCategory,
  publishArticle,
  ShowArticleById
  // deleteImage
} from '../../network/article'
import {
  ShowTagsAll,
} from '../../network/aside'
export default {
  name: 'Edit',
  components: {
  },
  data () {
      return {
        formSeletor: {
          sort: '',
          tags: ''
        },
        articleTitle: '',
        content: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览,
        },

        categoryData: [],
        tagsData: [],
        articleTable: {
          articleTitle: '',
          articleSummary: '',
          articleContent: '',
          categoryId: '',
          tagsId: '',
          picture: '',
          textContent: '',
          articleState: '',
          first_picture: '',
          categoryName: '',
          tagsName: '',
        },
        html: '',
        fileList: [],
        articleId: ''
      }
    },
    
    created() {
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
      }));
      
    },
    mounted() {
      this.$eventBusiIcon.$on("eventBusName", (val, index) => {
        console.log("edit",val);
        this.articleId = val;
        ShowArticleById(val).then(res => {
          console.log(res,"----")
          this.articleTable = res;
          this.$set(this, 'content', res.textContent)
          console.log(this.articleTable)
        })
        this.icon = index;
      });
    // this.timer = setInterval(this.get, 1000);
    },
    methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd (pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$axios.post('http://localhost:8081/upload/uploadImage', formdata).then(res => {
        if(res) {
          this.$refs.md.$img2Url(pos, res.data.path);
          console.log(res.data.name)
          this.articleTable.picture = this.articleTable.picture + res.data.name + ",";
          if(pos == 1){
            this.articleTable.first_picture = res.data.path;
          }
          console.log(this.articleTable.first_picture,"++**99")

        }
        console.log(this.articleTable.picture)
      }).catch(err => {
        console.log(err)
      })
    },
    $imgDel(pos) {
      console.log(pos[0]);
      var formdata = new FormData();
      formdata.append("url", pos[0]);
      // deleteImage(pos[0])
      //   .then(response => {
      //     if (response.success) {
      //       this.error("删除图片成功");
      //     } else {
      //       this.error("删除图片失败:" + response.message);
      //     }
      //   })
      //   .catch(error => {
      //     this.error("删除图片失败:" + error);
      //   });
    },
    change (value, render) {
      this.html = render
      this.articleTable.articleContent = render
      this.articleTable.textContent = value
      // console.log(render)
    },
    publishArticle (articleState) {
      this.articleTable.articleState = articleState;
      this.articleTable.categoryId = this.articleTable.categoryName;
      this.articleTable.tagsId = this.articleTable.tagsName;
      publishArticle(this.articleTable);
      this.$eventBusTag.$emit("eventBusName", "文章管理", "article");
    },

    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
    },

    //图片
    handleSuccess (response, file, fileList) {
      this.articleTable.picture = response.data
      console.log(file,fileList)
    },
  
  }
}
</script>

<style scoped>
#edit {
  padding: 0 10px;
  overflow: scroll;
}
.m-submit {
    margin: 10px 0;
    padding: 0 5px;
    text-align: right;
}
.m-submit-buttom {
    display: inline-block;
}
.upload-demo {
  display: inline-block;
}
</style>