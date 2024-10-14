export default [
  {
    path: '/mySharing',
    name: 'MySharing',
    component: () => import('@/views/WorkBenches/component/MyShare.vue')
  },
  {
    path: '/shareMe',
    name: 'ShareMe',
    component: () => import('@/views/WorkBenches/component/ShareMe.vue')
  },
  {
    path: '/groupManage',
    name: 'GroupManage',
    component: () => import('@/views/WorkBenches/component/GroupMange.vue')
  }
]
