<template>
    <div id="edit">
      <el-form
        :inline="true"
        :model="formInline"
        class="text-form-inline"
      >
        <el-form-item>
          <el-select v-model="formSeletor.sort" placeholder="请选择文章分类">
            <el-option label="所有" value="所有"></el-option>
            <el-option
              :label="item.sortName"
              :value="item.sortName"
              v-for="item in bookSorts"
              :key="item.sortId"
            ></el-option>
          </el-select>
          <el-select v-model="formSeletor.sort" placeholder="请选择文章标签">
            <el-option label="所有" value="所有"></el-option>
            <el-option
              :label="item.sortName"
              :value="item.sortName"
              v-for="item in bookSorts"
              :key="item.sortId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-input
          placeholder="请输入文章标题"
          v-model="input"
          style="width:35%;text-align: left; margin-right: 10px"
          clearable>
        </el-input>
        <el-button type="primary">上传图片</el-button>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入文章概述"
          style="margin-bottom:22px"
          v-model="textarea">
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
            <el-button class="m-submit-buttom" type="primary" round>保存草稿</el-button>
            <el-button class="m-submit-buttom" type="success" round>发布文章</el-button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Edit',
  components: {
  },
  data () {
      return {
        formSeletor: {
          sort: '',
        },
        value: '',
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
      }
    },
    methods: {
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.img_file[pos] = $file
      this.$http({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        let _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    },
    change (value, render) {
      this.html = render
    },
    // 提交
    submit () {
      console.log(this.content)
      console.log(this.html)
    }
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
</style>