<template>
  <div>
    <div id="navbar" class="nav_container">
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
      ><i :class="item.icon"></i>{{ item.name }}</el-menu-item
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
  <!-- <el-input id="search" placeholder="请输入内容" v-model="search" class="search">
      <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input> -->
  <!-- <el-button icon="el-icon-search" class="search" circle></el-button> -->
  <div id="search">
    <el-autocomplete
      class="inline-input search"
      v-model="state"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ><i
    class="el-icon-search el-input__icon"
    slot="suffix">
  </i></el-autocomplete>
  </div>
  </div>
    <div id="nav_bottom"></div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "NavBar",
  data() {
    return {
      search: "",
      screenWidth: document.body.clientWidth,
      navItems: [
        { icon: "el-icon-house", name: "首页", indexPath: "/index", index: "1" },
        { icon: "el-icon-folder-opened", name: "分类", indexPath: "/category", index: "2" },
        { icon: "el-icon-date", name: "流年记", indexPath: "/archives", index: "3" },
        { icon: "el-icon-chat-line-round", name: "留言板", indexPath: "/message", index: "4" },
        { icon: "el-icon-link", name: "友情链接", indexPath: "/friends", index: "5" },
        { icon: "el-icon-picture-outline", name: "照片墙", indexPath: "/photo", index: "6" },
        { icon: "el-icon-headset", name: "音乐盒", indexPath: "/player", index: "7" },
        { icon: "el-icon-collection", name: "学习资源", indexPath: "/resources", index: "8" },
        { icon: "el-icon-user", name: "关于我", indexPath: "/about", index: "9" },
      ],
      isOpen: false,
      restaurants: [],
      state: '',
      currentPath: "",
    };
  },
  methods: {
      isCollapse(){
          this.isOpne=!this.isOpen;
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
    
  },
  mounted() {
    var temp = this.$route.path;
    // console.log(temp);
    if(temp == "/player")
      {
        $("#navbar").css('opacity','1')
      }
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
    this.restaurants = this.loadAll();
     document.onmousewheel = function(e) {
          e = e || window.event;
          var wheelDelta = e.wheelDelta;
            if(temp != "/player")
            {
              if(temp != "/photo"){
                if (wheelDelta > 0) {
                  $("#navbar").css("display", "block");
                  $("#navbar").css('position','fixed');
                  $("#navbar").css('width','100%')
                  $("#navbar").css('z-index', '9');
                  $("#navid").css("height", "61px");
                  $("#navbar").css('opacity','0.8')
                  $("#search").css("display", "block");
                  $("#nav_bottom").css('height','61px')
                } else {
                  // $("#navbar").css("display", "none");
                  $("#navid").css("height", "0");
                  $("#search").css("display", "none");
                  // $("#navbar").css("top", "30px");
                  // $("#navbar").css("bottom", "30px");
                }
              }
            } 
          }
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
.nav_container {
  height: 61px;
  position: relative;
  opacity: 0.8;
  transition: all .6s;
}
.nav_bottom {
  height: 0;
  display: none;
}
.navbar {
  position: fixed;
}
.el-menu-vertical-demo {
  height: 61px;
  transition: all .6s;
}
.m-nav-logo {
  color: yellow;
  font-size: 20px;
  letter-spacing: 2px;
  margin-right: 10px;
}
.search {
  position: absolute;
  top: 10px;
  right: 10px;
  transition: all 1s;
  border-radius: 50%;
  width: 40px;
  /* width: 200px; */
}
.search:hover{
  width: 200px;
}
.el-input__icon {
  width: 30px;
}
</style>