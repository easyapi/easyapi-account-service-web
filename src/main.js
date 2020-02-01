import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './service/fetch'

Vue.prototype.$ajax = axios

import $ from 'jquery'
import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';

import './assets/css/reset.css'
import './assets/styles/index.styl'

Vue.config.productionTip = false

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
