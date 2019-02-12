// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
window.sss = {
  XXX: 2
}
var t1 = 'first';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
console.log("error");
