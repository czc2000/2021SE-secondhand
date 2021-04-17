import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from 'vuex';
import store from './Vuex/store'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.devtools = true
Vue.use(VueAxios,axios)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
