<template>
  <div>
    <el-menu
    text-color="#fff"
    id="navid"
    class="el-menu-vertical-demo"
    mode="horizontal"
    background-color="#545c64"
    :default-active="this.$route.path" 
    router
    active-text-color="#ffd04b"
  >
    <el-menu-item ><span class="m-nav-logo">MyBblog</span> </el-menu-item>
    <el-menu-item
    id="itemId"
      :key="key"
      style="font-size: 18px;"
      v-for="(item, key) in leftNavItems"
      :index="item.indexPath"
      :route="item.indexPath"
      >{{ item.name }}</el-menu-item
    >
    <el-submenu
      style="float: right;"
      class="right-item"
      v-if="Object.keys(rightNavItems).length === 0 ? false : true"
      index="1"
    >
      <template slot="title">
        <i class="el-icon-s-fold" style="font-size: 28px; color: #2d2d2d;" @click="isCollapse"></i>
      </template>
      <el-menu-item
        :key="key"
        v-for="(item, key) in rightNavItems"
        :index="item.index"
        >{{ item.name }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      screenWidth: document.body.clientWidth,
      navItems: [
        { name: "首页", indexPath: "/index", index: "1" },
        { name: "分类", indexPath: "/category", index: "2" },
        { name: "流年记", indexPath: "/category", index: "3" },
        { name: "留言板", indexPath: "/message", index: "4" },
        { name: "友情链接", indexPath: "/friends", index: "5" },
        { name: "照片墙", indexPath: "/photo", index: "6" },
        { name: "音乐盒", indexPath: "/player", index: "7" },
        { name: "学习资源", indexPath: "/resources", index: "8" },
        { name: "关于我", indexPath: "/about", index: "9" },
      ],
      isOpen: false,
    };
  },
  methods: {
      isCollapse(){
          this.isOpne=!this.isOpen;
      },
  },
  mounted() {
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  watch: {
    screenWidth(newValue) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = newValue;
        this.timer = true;
        setTimeout(() => {
          //console.log(this.screenWidth);
          this.timer = false;
        }, 400);
      }
    },
  },
  computed: {
    leftNavItems: function () {
      return this.screenWidth >= 600 ? this.navItems : {};
    },
    rightNavItems: function () {
      return this.screenWidth < 600 ? this.navItems : {};
    },
  },
};
</script>

<style scoped>
  .m-nav-logo {
    color: yellow;
    font-size: 20px;
    letter-spacing: 2px;
  }
</style>