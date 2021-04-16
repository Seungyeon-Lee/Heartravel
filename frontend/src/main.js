import Vue from 'vue'
import App from './App'
import router from './router'
import './permission'
import axios from 'axios'
import VueSessionStorage from 'vue-sessionstorage'
import 'core-js/stable'
import CoreuiVue from '@coreui/vue'
import vSelect from 'vue-select'
import { iconsSet as icons } from './assets/icons/icons.js'


Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// Vue.config.performance = true
Vue.use(CoreuiVue);
Vue.use(VueSessionStorage);
Vue.component('v-select', vSelect);

new Vue({
  router,
  icons,
  render: h => h(App)
}).$mount('#app');
