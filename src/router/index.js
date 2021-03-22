import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/user/Index.vue'

import Home from '../views/admin/Home.vue'
import UserList from '../views/admin/UserList.vue'
import Article from '../views/admin/Article.vue'
import Notice from '../views/admin/Notice.vue'
import Login from '../views/Login.vue'
import HelloWorld from '../components/HelloWorld.vue'
import NoFind from '../views/404.vue'
import Category from '../views/user/Category.vue'
import Edit from '../views/admin/Edit.vue'
import Details from '../views/user/Details.vue'
import Message from '../views/user/Message.vue'
import Player from '../views/user/Player.vue'
import Friends from '../views/user/Friends.vue'
import Photo from '../views/user/Photo.vue'
import Resources from '../views/user/Resources.vue'
import About from '../views/user/About.vue'
import Archives from '../views/user/Archives.vue'
import Comment from '../views/admin/Comment.vue'
import Sort from '../views/admin/Sort.vue'
import Label from '../views/admin/Label.vue'
import Words from '../views/admin/Words.vue'
import Link from '../views/admin/Link.vue'
import Picture from '../views/admin/Picture.vue'
import Knowledge from '../views/admin/Knowledge.vue'
import Author from '../views/admin/Author.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/user',
  name: 'user',
  component: UserList
},
{
  path: '/article',
  name: 'article',
  component: Article
},
{
  path: '/notice',
  name: 'notice',
  component: Notice
},
{
  path: '/helloWorld',
  name: 'helloWorld',
  component: HelloWorld
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/index',
  name: 'index',
  component: Index,
},
{
  path: '/category',
  name: 'category',
  component: Category
},
{
  path: '/edit',
  name: 'edit',
  component: Edit
},
{
  path: '/details',
  name: 'details',
  component: Details
},
{
  path: '/player',
  name: 'player',
  component: Player
},
{
  path: '/message',
  name: 'message',
  component: Message
},
{
  path: '/friends',
  name: 'friends',
  component: Friends
},
{
  path: '/photo',
  name: 'photo',
  component: Photo
},
{
  path: '/resources',
  name: 'resources',
  component: Resources
},
{
  path: '/about',
  name: 'about',
  component: About
},
{
  path: '/archives',
  name: 'archives',
  component: Archives
},
{
  path: '/comment',
  name: 'comment',
  component: Comment
},
{
  path: '/sort',
  name: 'sort',
  component: Sort
},
{
  path: '/label',
  name: 'label',
  component: Label
},
{
  path: '/words',
  name: 'words',
  component: Words
},
{
  path: '/link',
  name: 'link',
  component: Link
},
{
  path: '/picture',
  name: 'picture',
  component: Picture
},
{
  path: '/knowledge',
  name: 'knowledge',
  component: Knowledge
},
{
  path: '/author',
  name: 'author',
  component: Author
},
{
  path: '/home',
  name: 'home',
  component: Home
},
{
  path: '*',
  name: '404',
  component: NoFind
},
  // { path: '*', redirect: '/login' }
]
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // routes
  routes,
  mode: 'history'
})

// 挂载路由导航守卫，如果用户未登陆，则跳转到登录页面
// router.beforeEach((to, form, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const user = window.sessionStorage.getItem('user')
//   console.log('tooken', user)
//   if (!user) {
//     return next('/login')
//   } else {
//     return next()
//   }
// })
export default router
