// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

import talk from './components/talk'
import store from './vuex/store'
//import barrage from "vue2-barrage";


Vue.prototype.$http = axios
Vue.config.productionTip = false

//Vue.use(barrage);
Vue.use(Vuex)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  //render: h => h(talk)
})
