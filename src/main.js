// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ability from './config/ability'
import { abilitiesPlugin } from '@casl/vue'

Vue.prototype.$http = Axios;

Vue.config.productionTip = false
Vue.use(abilitiesPlugin, ability)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
