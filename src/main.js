// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 加载全局插件
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import Vuex from 'vuex'
import Store from './vuex/state'
import 'babel-polyfill'
import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'

Vue.use(Vuex)
Vue.use(wcSwiper)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    var token = sessionStorage.token
    if (to.meta.requiresAuth && !token) {
      next('/')
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(Store),
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
