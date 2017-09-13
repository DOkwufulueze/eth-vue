import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store'

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App />',
  components: { App }
})
