<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
          background-color="#324157"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="addTag('首页', 'el-icon-reading')">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="2-1"
                @click="addTag('发表文章', 'el-icon-user', 'edit')"
              >
                <i class="el-icon-edit"></i>
                <span slot="title">发表文章</span>
              </el-menu-item>
              <el-menu-item
                index="2-2"
                @click="addTag('文章管理', 'el-icon-user', 'article')"
              >
                <i class="el-icon-reading"></i>
                <span slot="title">文章管理</span>
              </el-menu-item>
              <el-menu-item
                index="2-3"
                @click="addTag('分类管理', 'el-icon-reading', 'sort')"
              >
                <i class="el-icon-folder-opened"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>
              <el-menu-item
                index="2-4"
                @click="addTag('标签管理', 'el-icon-reading', 'label')"
              >
                <i class="el-icon-price-tag"></i>
                <span slot="title">标签管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-chat-round"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="3-1"
                @click="addTag('评论管理', 'el-icon-c', 'comment')"
              >
                <i class="el-icon-chat-dot-square"></i>
                <span slot="title">评论管理</span>
              </el-menu-item>
              <el-menu-item
                index="3-2"
                @click="addTag('留言管理', 'el-icon-reading', 'words')"
              >
                <i class="el-icon-chat-line-round"></i>
                <span slot="title">留言管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-guide"></i>
              <span>其它管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="4-1"
                @click="addTag('友链管理', 'el-icon-reading', 'link')"
              >
                <i class="el-icon-link"></i>
                <span slot="title">友链管理</span>
              </el-menu-item>
              <el-menu-item
                index="4-2"
                @click="addTag('照片管理', 'el-icon-reading', 'picture')"
              >
                <i class="el-icon-picture-outline"></i>
                <span slot="title">照片管理</span>
              </el-menu-item>
              <el-menu-item
                index="4-3"
                @click="addTag('资源管理', 'el-icon-reading', 'knowledge')"
              >
                <i class="el-icon-collection"></i>
                <span slot="title">资源管理</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item
            index="5"
            @click="addTag('关于我', 'el-icon-reading', 'author')"
          >
            <i class="el-icon-user"></i>
            <span slot="title">关 于 我</span>
          </el-menu-item>
          <el-menu-item
            index="6"
            @click="addTag('公告管理', 'el-icon-reading', 'notice')"
          >
            <i class="el-icon-bell"></i>
            <span slot="title">公告管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "NavRight",
  data() {
    return {
      collapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    isCollapse() {
      this.collapse = !this.collapse;
    },
    addTag(val, two, path) {
      this.$eventBusTag.$emit("eventBusName", val, path);
      this.$eventBusiIcon.$emit("eventBusName", val, two, path);
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", () => {
      this.isCollapse();
    });
  },
};
</script>


<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  text-align: left;
  background-color: #324157;
  overflow-y: scroll;
}

.sidebar .el-menu-vertical {
  border: hidden;
}

.sidebar::-webkit-scrollbar {
  display: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
