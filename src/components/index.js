/**
 * Created by jiannan.niu on 2017/8/15.
 */

import Vue from 'vue'

import NumberFormatFixed from '@/components/NumberFormatFixed/index.vue'
import IconSvg from '@/components/Icon-svg/index.vue'

//注册全局组件，name采用与标签名相同的写法
Vue.component('number-format-fixed', NumberFormatFixed);
Vue.component('icon-svg', IconSvg)
