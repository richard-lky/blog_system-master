<template>
  <div :class="{ tags: true, 'content-collapse': collapse }">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="isActive"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        effect="dark"
      >
        <div class="iframe" v-if="item.path == 'user'"><user-list /></div>
        <div class="iframe" v-if="item.path == 'comment'"><comment /></div>
        <div class="iframe" v-if="item.path == 'article'"><Article /></div>
        <div class="iframe" v-if="item.path == 'edit'"><Edit /></div>
        <div class="iframe" v-if="item.path == 'sort'"><sort /></div>
        <div class="iframe" v-if="item.path == 'label'"><Label /></div>
        <div class="iframe" v-if="item.path == 'words'"><words /></div>
        <div class="iframe" v-if="item.path == 'link'"><Link /></div>
        <div class="iframe" v-if="item.path == 'picture'"><Picture /></div>
        <div class="iframe" v-if="item.path == 'knowledge'"><Knowledge /></div>
        <div class="iframe" v-if="item.path == 'notice'"><notice /></div>
        <div class="iframe" v-if="item.path == 'author'"><author /></div>
        <div class="iframe" v-if="item.path == 'home'"><home /></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import UserList from "../views/admin/UserList.vue";
import Comment from "../views/admin/Comment.vue";
import Sort from "../views/admin/Sort.vue";
import Label from "../views/admin/Label.vue";
import Words from "../views/admin/Words.vue";
import Link from "../views/admin/Link.vue";
import Picture from "../views/admin/Picture.vue";
import Knowledge from "../views/admin/Knowledge.vue";
import Article from "../views/admin/Article.vue";
import Edit from "../views/admin/Edit.vue";
import Notice from "../views/admin/Notice.vue";
import Author from "../views/admin/Author.vue";
import Home from "../views/admin/Home.vue";
export default {
  namne: "Tag",
  components: {
    UserList,
    Comment,
    Article,
    Edit,
    Sort,
    Label,
    Words,
    Link,
    Picture,
    Knowledge,
    Notice,
    Author,
    Home,
  },
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "首页",
          path: "home",
          name: "1",
        },
      ],
      tabIndex: 1,
      collapse: true,
      icon: "",
    };
  },
  methods: {
    addTab(tabName, path) {
      let result = 0;
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].title == tabName) {
          result = 1;
          break;
        }
      }
      if (result == 0) {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: tabName,
          name: newTabName,
          path: path,
        });
        this.editableTabsValue = newTabName;
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
    isActive(tabName) {
      for (let i = 0; i < this.editableTabs.length; i++) {
        if (this.editableTabs[i].title == tabName) {
          this.editableTabsValue = this.editableTabs[i].name;
          break;
        }
      }
    },
    isCollapse(val) {
      this.collapse = val;
    },
  },
  mounted() {
    this.$eventBus.$on("eventBusName", (val) => {
      this.isCollapse(val);
    });
    this.$eventBusTag.$on("eventBusName", (val, path) => {
      this.isActive(val);
      this.addTab(val, path);
    });
    this.$eventBusiIcon.$on("eventBusName", (val, index) => {
      console.log(val);
      this.icon = index;
    });
  },
};
</script>


<style  scoped>
.tags {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-left: 5px;
  margin-top: 5px;
  text-align: left;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  overflow: scroll;
  background: #f0f0f0;
}
.content-collapse {
  left: 65px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.iframe {
  height: 100%;
  width: 100%;
}
</style>


