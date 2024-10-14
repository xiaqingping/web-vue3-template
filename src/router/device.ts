export default [
  {
    path: '/deviceDetail/:deviceId',
    name: 'DeviceDetail',
    component: () => import('@/views/Devices/component/Detail.vue')
  },
  {
    path: '/runStatus/:deviceId/:categoryId',
    name: 'RunStatus',
    component: () => import('@/views/Devices/component/RunStatus.vue')
  },
  {
    path: '/runStatusChart',
    name: 'RunStatusChart',
    component: () => import('@/views/Devices/component/RunStatusChart.vue')
  },
  {
    path: '/alarmInfo/:deviceId',
    name: 'AlarmInfo',
    component: () => import('@/views/Devices/component/AlarmInfo.vue')
  },
  {
    path: '/plcPoint',
    name: 'PlcPoint',
    component: () => import('@/views/Devices/component/PlcPoint.vue')
  },
  {
    path: '/deviceBinding',
    name: 'DeviceBinding',
    component: () => import('@/views/Devices/component/DeviceBinding.vue')
  },
  {
    path: '/deviceInfo',
    name: 'DeviceInfo',
    component: () => import('@/views/Devices/component/DeviceInfo.vue')
  }
]
