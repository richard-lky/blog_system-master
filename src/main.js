import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入elementUi插件
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from 'moment' // 时间格式化

//引入mavon-editor插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引用js文件
// import'./assets/js/jquery.min.js'

// 引入echarts
import * as echarts from 'echarts'

//axios
import axios from 'axios'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'  //关键代码
// Vue.config.productionTip = false

Vue.prototype.$echarts = echarts


//引入mavon-editor插件
Vue.use(mavonEditor)

//引入elementUi插件
Vue.use(ElementUI)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$eventBusTag = new Vue()
Vue.prototype.$eventBusiIcon = new Vue()
Vue.prototype.$moment = moment
Vue.config.productionTip = false

//定义全局变量
// Vue.prototype.$articleId = 1;

Vue.prototype.$baseImgUrl = 'http://browser9.qhimg.com/bdm/768_474_0/'
// Vue.prototype.$activeIndex = 'D:/图片/'

Vue.prototype.$user = Object.assign({
    id: '',
    userId: '',
    userName: '',
    userAge: '',
    userPassword: '',
    userEmail: '',
    userSex: '',
    userPhone: '',
    userCategory: ''
}, JSON.parse(window.sessionStorage.getItem('user')))


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// 配置代理，解决跨域
Vue.prototype.HOST = {
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}

// 保存登录用户的信息
