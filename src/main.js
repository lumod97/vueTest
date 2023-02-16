import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from "./route"
import VueMask from 'v-mask'
import money from 'v-money'
import FeatherIcon from "./core/Feather.vue"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import swal from 'sweetalert';
import 'es6-promise/auto'
import VueRouter from 'vue-router'
/****************** SOCKETS IMPLEMENTATION **********/
import "./sockets/index";
// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import './assets/main.css'

Vue.component(FeatherIcon.name, FeatherIcon);
Vue.use(Vuex)
Vue.use(VueRouter)
// V-MASK 
Vue.use(VueMask);
// register directive v-money and component <money>
Vue.use(money, {precision: 2, prefix: "S/"})
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue, {
  BModal: { headerBgVariant: "primary", titleClass: "text-light" },
  breakpoints: ["xs", "sm", "md", "lg", "xl", "xxl"],
});
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


new Vue({
    router,
  render: (h) => h(App)
}).$mount('#app')
