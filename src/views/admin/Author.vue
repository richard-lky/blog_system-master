<template>
  <div style="padding: 0 20px">
    <div class="card-avatar">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/upload/uploadImage"
        :show-file-list="false"
        :on-success="avatarHandleSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="authoInfo.aboutImg" :src="authoInfo.aboutImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/upload/uploadImage"
        :show-file-list="false"
        :on-success="chartHandleSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="authoInfo.aboutBgimg" :src="authoInfo.aboutBgimg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/upload/uploadImage"
        :show-file-list="false"
        :on-success="qqHandleSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="authoInfo.aboutQq" :src="authoInfo.aboutQq" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div style="margin-bottom: 15px">
      <span style="margin-left:75px">头像</span>
      <span style="margin-left: 167px">微信</span>
      <span style="margin-left: 170px">QQ</span>
    </div>
    <div style="margin-bottom: 15px; width: 30%">
        <template slot="prepend">昵&emsp;称:</template>
      <el-input v-model="authoInfo.aboutName" placeholder="请输入昵称```" clearable>
      </el-input>
    </div>
    <div style="margin-bottom: 15px; width: 60%">
      <el-input v-model="authoInfo.aboutMotto" placeholder="请输入座右铭``" clearable>
      </el-input>
    </div>
    <mavon-editor
        v-model="content"
        ref="md"
        @change="change"
        style="min-height: 600px"
    />
    <div style="display: flex;margin-top: 10px;justify-content: flex-end; margin-bottom: 30px">
      <el-button type="primary" @click="updateInfo" round>确 定</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {
  updateAbout,
  ShowAbout
} from '../../network/others'
export default {
  name: "Author",
  comments: {

  },
  data () {
    return {
      content: '',
      authoInfo: {
        aboutId: '',
        aboutImg: '',
        aboutName: '',
        aboutMotto: '',
        aboutContent: '',
        textContent: '',
        aboutQq: ''
      }
    }
  },
  components: {
    mavonEditor
  },
  created() {
    // this.getAuthInfo()
    ShowAbout().then(res => {
            console.log(res)
            if(res){
                this.authoInfo = res;
                this.$set(this, 'content', res.textContent)
            }else {
                this.authoInfo =[];
            }
        })
  },
  methods: {
    
    // 将图片上传到服务器，返回地址替换到md中
    // $imgAdd (pos, $file) {
    //   const formdata = new FormData()
    //   formdata.append('file', $file)
    //   this.$axios.post('/upload/picture', formdata).then(res => {
    //     this.$refs.md.$img2Url(pos, res.data.data)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    change (value, render) {
      this.authoInfo.aboutContent = render
      this.authoInfo.textContent = value
      // console.log(render)
    },
    // getAuthInfo () {
    //   var token = sessionStorage.getItem('token')
    //   this.$axios.defaults.headers.Authorization = 'Bearer ' + token
    //   this.$axios.get('/authorInfo/getInfo', {
    //     params: {
    //       id: window.sessionStorage.getItem('uid')
    //     }
    //   }).then(response => {
    //     this.$set(this, 'authoInfo', response.data.data)
    //     this.$set(this, 'content', response.data.data.text_content)
    //     console.log(this.content)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    updateInfo () {
      // this.authoInfo.id = window.sessionStorage.getItem('uid')
      // var token = sessionStorage.getItem('token')
      // this.$axios.defaults.headers.Authorization = 'Bearer ' + token
      console.log(this.authoInfo)
      updateAbout(this.authoInfo).then(res => {
        console.log(res)
        // if (res.code === '200') this.$message.success(res.msg)
        // else this.$message.error(res.msg)
      })
    },
    avatarHandleSuccess(res) {
      this.authoInfo.aboutImg = res.path;
      console.log(res)
    },
    chartHandleSuccess (res, file) {
      this.authoInfo.aboutBgimg= res.path
      console.log(file);
    },
    qqHandleSuccess (res, file) {
      this.authoInfo.aboutQq = res.path
      console.log(file);
    },
    beforeAvatarUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    AvatarSuccess (res, file) {
      this.authoInfo.background = res.data
      console.log(file);
    }
  }
}
</script>

<style scoped>
.avatar-uploader{
  width: 178px;
  height: 178px;
  border: 1px solid #8c939d;
  margin: 20px 20px 10px 0;
  background: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
.card-avatar{
  width: min-content;
  display: flex;
}
</style>
