import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
// 引入vue2-svg-icon并且注册组件
import Icon from 'vue2-svg-icon/Icon'
import './assets/css/normalize.css'
// 省市区联动css
import 'vue-area-linkage/dist/index.css'
// 省市区联动
import VueAreaLinkage from 'vue-area-linkage'

Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(ElementUi)

Vue.use(VueAreaLinkage)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
