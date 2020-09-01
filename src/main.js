import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'

import routes from '@/routes'
import store from '@/store'

import "@/css/tailwind.css";

import App from './App.vue'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

Vue.use(VueSweetalert2);
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: routes,
  store,
  render: h => h(App),
})
