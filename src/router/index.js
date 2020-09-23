import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: false,
        title: '首页'
      },
      component: resolve => require(['@/pages/index.vue'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        keepAlive: false,
        title: '密码登录'
      },
      component: resolve => require(['@/pages/login.vue'], resolve)
    },
    {
      path: '/captcha-login',
      name: 'CaptchaLogin',
      meta: {
        keepAlive: false,
        title: '验证码登录'
      },
      component: resolve => require(['@/pages/captcha-login.vue'], resolve)
    },
    {
      path: '/signup',
      name: 'Signup',
      meta: {
        keepAlive: false,
        title: '注册'
      },
      component: resolve => require(['@/pages/signup.vue'], resolve)
    },
    {
      path: '/modify',
      name: 'modify',
      meta: {
        keepAlive: false,
        title: '个人资料'
      },
      component: resolve => require(['@/pages/setting/data.vue'], resolve)
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      meta: {
        keepAlive: false,
        title: '修改密码'
      },
      component: resolve => require(['@/pages/change-password.vue'], resolve)
    },
    {
      path: '/forget-password',
      name: 'ForgetPassword',
      meta: {
        keepAlive: false,
        title: '忘记密码'
      },
      component: resolve => require(['@/pages/forget-password.vue'], resolve)
    }
  ]
})
