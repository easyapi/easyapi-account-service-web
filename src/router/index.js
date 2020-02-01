import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/register',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/loading'
    // },
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: false,
        title: '首页'
      },
      component: resolve => require(['@/pages/index.vue'], resolve)
    },
    // {
    //   path: '/loading',
    //   name: 'Loading',
    //   meta: {
    //     title: '正在加载'
    //   },
    //   component: resolve => require(['@/pages/Loading.vue'], resolve)
    // },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: false,
        title: '密码登录'
      },
      component: resolve => require(['@/pages/Login.vue'], resolve)
    },
    {
      path: '/sms-login',
      name: 'sms-login',
      meta: {
        keepAlive: false,
        title: '验证码登录'
      },
      component: resolve => require(['@/pages/SmsLogin.vue'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        keepAlive: false,
        title: '注册'
      },
      component: resolve => require(['@/pages/Register.vue'], resolve)
    },
    {
      path: '/modify',
      name: 'modify',
      meta: {
        keepAlive: false,
        title: '个人资料'
      },
      component: resolve => require(['@/pages/modify.vue'], resolve)
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      meta: {
        keepAlive: false,
        title: '修改密码'
      },
      component: resolve => require(['@/pages/changePassword.vue'], resolve)
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        keepAlive: false,
        title: '忘记密码'
      },
      component: resolve => require(['@/pages/forgetPassword.vue'], resolve)
    },
    {
      path: '/modifyNickname',
      name: 'modifyNickname',
      meta: {
        keepAlive: false,
        title: '修改昵称'
      },
      component: resolve => require(['@/pages/modifyNickname.vue'], resolve)
    }
  ]
})
