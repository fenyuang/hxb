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

Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: new Vuex.Store(Store),
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
