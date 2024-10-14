import { createRouter, createWebHistory } from 'vue-router'
import { t } from '@/lang'

import Devices from './device'
import Works from './works'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index/homePage',
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: () => import('@/views/Login/Login.vue'),
    // },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: () => import('@/views/Login/Register.vue'),
    // },
    {
      path: '/index',
      name: 'HomePage',
      component: () => import('@/views/Index.vue'),
      children: [
        {
          path: 'homePage', // 首页
          name: 'HomePage',
          component: () => import('@/views/HomPage/index.vue')
        },
        {
          path: 'devices', // 设备
          name: 'Devices',
          component: () => import('@/views/Devices/index.vue')
        },
        {
          path: 'workBenches', // 工作台
          name: 'WorkBenches',
          component: () => import('@/views/WorkBenches/index.vue')
        },
        {
          path: 'messages', // 消息
          name: 'Messages',
          component: () => import('@/views/Messages/index.vue')
        },
        {
          path: 'my', // 我的
          name: 'My',
          component: () => import('@/views/My/index.vue')
        }
      ]
    },
    // ...Devices,
    // ...Works
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.includes('/index.html')) {
    return next('/')
  }
  if (to.name) {
    // @ts-ignore
    document.title = t('route.' + to.name)
  }
  next()//执行进入路由，如果不写就不会进入目标页
})

export default router
