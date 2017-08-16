// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'element-ui/lib/theme-default/index.css'
import 'animate.css'
import 'font-awesome/css/font-awesome.css'
import 'nprogress/nprogress.css'
import 'normalize.css/normalize.css'
import '@/assets/iconfont/iconfont'
import '@/utils/index'
import '@/components/index'
import '@/filters/index'
import '@/directives/index'

import {getToken} from '@/utils/auth'

import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import accounting from 'accounting'

//扩展Vue实例上的公共方法
Object.defineProperty(Vue.prototype, '$$_', {value: _})
Object.defineProperty(Vue.prototype, '$$axios', {value: axios})
Object.defineProperty(Vue.prototype, '$$moment', {value: moment})
Object.defineProperty(Vue.prototype, '$$accounting', {value: accounting})

//生产环境关闭提示
Vue.config.productionTip = false

//使用插件
Vue.use(ElementUI);

//注册路由钩子
const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'});
    } else {
      if (store.getters.addRouters.length === 0) {
        // store.dispatch('GetInfo').then(res => {
        // const auth = res.data.auth;

        store.dispatch('GetResources').then(function (res) {
          store.dispatch('GetCalendarDates');

          const auth = res;
          store.dispatch('GenerateRoutes', {auth}).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({...to});
          })
        })

        // })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

//生成Vue实例
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
