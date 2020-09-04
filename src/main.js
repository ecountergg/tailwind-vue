import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

import routes from '@/routes';
import store from '@/store';

import '@/css/tailwind.css';

import App from '@/App.vue';

import api from '@/services/api';

Vue.config.productionTip = false
Vue.prototype.$http = api;
api.defaults.timeout = 10000;

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})

Vue.use(VueSweetalert2);
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

new Vue({
  el: '#app',
  router: routes,
  store,
  render: h => h(App),
})
