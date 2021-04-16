<template>
  <div id="album">
    <nav-bar></nav-bar>
    <div id="wrap">
      <vue-waterfall-easy
        :imgsArr="imgsArr"
        @click="clickFn"
        @scrollReachBottom="fetchImgsData"
      ></vue-waterfall-easy>
      
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      style="height: auto"
      width="70%">
      <el-image 
        :src="srcList.src">
      </el-image>
      <div class="pre_text">{{srcList.info}}</div>
    </el-dialog>
  </div>
</template>

<script>
import vueWaterfallEasy from "vue-waterfall-easy";
import NavBar from "../../components/NavBar.vue";
import {
  ShowPhotoAll
} from '../../network/others'
export default {
  name: "Photo",
  components: {
    vueWaterfallEasy,
    NavBar,
  },
  data() {
    return {
      imgsArr: [], //存放所有已加载图片的数组（即当前页面会加载的所有图片）
      fetchImgsArr: [], //存放每次滚动时下一批要加载的图片的数组
      dialogVisible: false,
      srcList: '',
      imgIndex: '',
      currentPage: 1,
      pageSize: 26,
      total: '',
    };
  },
  methods: {
    clickFn(event, { index, value }) {
    // 阻止a标签跳转
    event.preventDefault()
    // 只有当点击到图片时才进行操作
    if (event.target.tagName.toLowerCase() == 'img') {
      console.log('img clicked',index, value);
      this.dialogVisible = true;
      this.imgIndex = index;
      this.srcList = value;
    }
  },
    fetchImgsData() {
      //获取新的图片数据的方法，用于页面滚动满足条件时调用
      if (this.imgsArr.length >= this.total) {
        console.log("已经到底了");
        this.$message.info('已经到底了')
        return;
      }
      this.imgsArr = this.imgsArr.concat(this.fetchImgsArr); //数组拼接，把下一批要加载的图片放入所有图片的数组中
      console.log("加载更多",this.currentPage);
      //this.imgsArr = this.imgsArr.concat(this.imgsArr)   //数组拼接，把下一批要加载的图片放入所有图片的数组中
      ShowPhotoAll(this.currentPage,this.pageSize).then(res => {
      console.log(res)
      // this.imgsArr = res.data;
      this.currentPage = this.currentPage + 1;
      this.fetchImgsArr = []
          for (var i = 0; i < res.data.length; i++) {
            this.fetchImgsArr.push({ src: res.data[i].photoUrl, link: '', info:  res.data[i].photoDescribe})
            this.total = res.total;
            //src为加载的图片的地址、link为超链接的链接地址、info为自定义的图片展示信息，我这里因为是使用的ant-design的card样式，所以我复制了card展示时的代码到info中，大家可以根据自己的情况自行填写
          }
    });
    },
  },
  created() {
    // this.imgsArr = this.initImgsArr(0, 20); //初始化第一次（即页面加载完毕时）要加载的图片数据
    // this.fetchImgsArr = this.initImgsArr(10, 20); // 模拟每次请求的下一批新的图片的数据数据
    ShowPhotoAll(this.currentPage,this.pageSize).then(res => {
      console.log(res)
      // this.imgsArr = res.data;
      this.currentPage = this.currentPage + 1;
      this.imgsArr = []
          for (var i = 0; i < res.data.length; i++) {
            this.imgsArr.push({ src: res.data[i].photoUrl, link: '', info:  res.data[i].photoDescribe})
            this.total = res.total;
            //src为加载的图片的地址、link为超链接的链接地址、info为自定义的图片展示信息，我这里因为是使用的ant-design的card样式，所以我复制了card展示时的代码到info中，大家可以根据自己的情况自行填写
          }
    });
    ShowPhotoAll(this.currentPage + 1,this.pageSize).then(ress => {
      console.log(this.currentPage,ress)
      // this.imgsArr = res.data;
      this.currentPage = this.currentPage + 1;
      this.fetchImgsArr = []
          for (var i = 0; i < ress.data.length; i++) {
            this.fetchImgsArr.push({ src: ress.data[i].photoUrl, link: '', info:  ress.data[i].photoDescribe})
            //src为加载的图片的地址、link为超链接的链接地址、info为自定义的图片展示信息，我这里因为是使用的ant-design的card样式，所以我复制了card展示时的代码到info中，大家可以根据自己的情况自行填写
          }
    });
  },
};
</script>

<style scoped>
#album {
  width: 100%;
  padding-bottom: 30px;
  height: 100%;
  /* margin-top: 60px; */
  /* box-sizing: border-box; */
}
#wrap {
  /* margin-top: 60px; */
  width: 100%;
  padding-bottom: 30px;
  height: calc(100%);
}
.pre_text {
  margin-top: 10px;
  color: #fff;
  font-size: 18px;
}
</style>
