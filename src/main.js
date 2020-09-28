import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(Toast)
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载
Vue.use(VueLazyLoad)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')