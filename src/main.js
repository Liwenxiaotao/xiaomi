import Vue from 'vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import VueLazyLoad from 'vue-lazyload';
import VueCookie from 'vue-cookie';
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import env from './env';
// 根据前端的跨域方式做调整
axios.defaults.baseURL = '/api'
// console.log(env.baseUrl);
// mock实际不会发生请求，在代码层面就被拦截
const mock = false;
if (mock) {
  require('./mock/api');
}
// axios.defaults.baseURL = env.baseUrl;
axios.defaults.timeout = 8000;
// 接口错误拦截
axios.interceptors.response.use(response => {
  let res = response.data;
  let path = location.hash;
  if (res.status === 0) {
    return res.data;
  } else if (res.status === 10) {
    if(path!=='#/index') {
      window.location.href = '/#/login';
      return Promise.reject(res);
    }
  } else {
    Message.warning(res.msg);
    return Promise.reject();
  }
})
// 把axios挂到vue实例
Vue.use(VueAxios, axios);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-balls.svg'
})
Vue.use(VueCookie);
// Vue.use(Message);
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
