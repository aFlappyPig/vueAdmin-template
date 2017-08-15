import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* login */
const Login = _import('login/index');

/* dashboard */
const dashboard = _import('dashboard/index');

/* error page */
const Err404 = _import('404');

/* demo page */
const Form = _import('page/form');
const InstructionBond = _import('page/instruction/bond');
const InstructionQuery = _import('page/instruction/query');

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/404', component: Err404, hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{path: 'dashboard', component: dashboard}]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/query',
    name: '投资指令',
    icon: 'zujian',
    children: [
      {path: 'query', component: InstructionQuery, name: '投资指令查询', icon: 'zonghe'},
      {path: 'bond', component: InstructionBond, name: '新建现券买卖指令', icon: 'zonghe'},
      {path: 'pledge', component: Form, name: '新建质押式回购指令', icon: 'zonghe'},
      {path: 'bought', component: Form, name: '新建买断式回购指令', icon: 'zonghe'},
    ]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/order',
    component: Layout,
    redirect: '/order/query',
    name: '投资指令',
    icon: 'zujian',
    children: [
      {path: 'query', component: Form, name: '投资指令查询', icon: 'zonghe'},
      {path: 'bond', component: InstructionBond, name: '新建现券买卖指令', icon: 'zonghe'},
      {path: 'pledge', component: Form, name: '新建质押式回购指令', icon: 'zonghe'},
      {path: 'bought', component: Form, name: '新建买断式回购指令', icon: 'zonghe'},
    ]
  },

  {
    path: '/approval',
    component: Layout,
    redirect: '/approval/index',
    name: '审批管理',
    icon: 'tubiaoleixingzhengchang',
    children: [{path: 'index', component: Form, name: '指令审批', icon: 'zonghe'}]
  },

  {
    path: '/deal',
    component: Layout,
    redirect: '/deal/execution',
    name: '交易管理',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {path: 'execution', component: Form, name: '指令执行', icon: 'zonghe'},
      {path: 'entrust', component: Form, name: '交易委托', icon: 'zonghe'},
      {path: 'enquery', component: Form, name: '交易查询', icon: 'zonghe'},
      {
        path: 'match', component: Form, name: '交易匹配', icon: 'zonghe',
        children: [
          {path: 'bank', component: Form, name: '银行间', icon: 'zonghe'},
          {path: 'exchange', component: Form, name: '交易所', icon: 'zonghe'}
        ]
      },
      {
        path: 'record', component: Form, name: '交易录入', icon: 'zonghe',
        children: [
          {path: 'bond', component: Form, name: '现券买卖', icon: 'zonghe'},
          {path: 'pledge', component: Form, name: '质押式回购', icon: 'zonghe'},
          {path: 'bought', component: Form, name: '买断式回购', icon: 'zonghe'},
        ]
      }
    ]
  },
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement/instruction',
    name: '支付清算',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {path: 'instruction', component: Form, name: '交易指令结算', icon: 'zonghe'},
      {path: 'capital', component: Form, name: '存续资金结算', icon: 'zonghe'}
    ]
  },
  {
    path: '/institution',
    component: Layout,
    redirect: '/institution/index',
    name: '机构管理',
    icon: 'tubiaoleixingzhengchang',
    children: [{path: 'index', component: Form, name: '机构管理', icon: 'zonghe'}]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/rolemgt',
    name: '角色用户',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {path: 'rolemgt', component: Form, name: '角色管理', icon: 'zonghe'},
      {path: 'roleadd', component: Form, name: '新增角色', icon: 'zonghe'},
      {path: 'usermgt', component: Form, name: '用户管理', icon: 'zonghe'}
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/capital',
    name: '帐户管理',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {path: 'capital', component: Form, name: '资金账户', icon: 'zonghe'},
      {path: 'bond', component: Form, name: '证券账户', icon: 'zonghe'},
      {path: 'portfolio', component: Form, name: '投资组合', icon: 'zonghe'}
    ]
  },
  {
    path: '/risk',
    component: Layout,
    redirect: '/risk/index',
    name: '风控管理',
    icon: 'tubiaoleixingzhengchang',
    children: [{path: 'index', component: Form, name: '风险控制', icon: 'zonghe'}]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/market',
    name: '系统管理',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {
        path: 'market', component: Form, name: '市场数据', icon: 'zonghe',
        children: [
          {path: 'bondinfo', component: Form, name: '债券信息', icon: 'zonghe'},
          {path: 'rateinfo', component: Form, name: '利率信息', icon: 'zonghe'},
          {path: 'ratemarket', component: Form, name: '利率行情', icon: 'zonghe'}
        ]
      },
      {path: 'plan', component: Form, name: '计划任务', icon: 'zonghe'},
      {path: 'calendar', component: Form, name: '交易日历', icon: 'zonghe'}
    ]
  },
  {
    path: '/dispatcher',
    component: Layout,
    redirect: '/dispatcher/index',
    name: '报表管理',
    icon: 'tubiaoleixingzhengchang',
    children: [
      {
        path: 'flow', component: Form, name: '流水报表', icon: 'zonghe',
        children: [
          {path: 'clear', component: Form, name: '清算流水', icon: 'zonghe'},
          {path: 'order', component: Form, name: '指令查询', icon: 'zonghe'}
        ]
      },
      {
        path: 'position', component: Form, name: '持仓报表', icon: 'zonghe',
        children: [
          {path: 'analysis', component: Form, name: '持仓分析', icon: 'zonghe'},
          {path: 'record', component: Form, name: '持仓录入', icon: 'zonghe'},
          {path: 'cash', component: Form, name: '头寸分析', icon: 'zonghe'}
        ]
      },
      {
        path: 'index', component: Form, name: '风险报表', icon: 'zonghe',
        children: [
          {path: 'index', component: Form, name: '风险分析', icon: 'zonghe'},
          {path: 'index', component: Form, name: '现金流缺口', icon: 'zonghe'}
        ]
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
];
