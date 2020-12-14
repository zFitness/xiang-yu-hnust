/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/index'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/index'),
    meta: { title: '关于我', keepAlive: false }
  },
  {
    path: '/chat',
    component: () => import('@/views/chat/index'),
    meta: { title: '聊天', keepAlive: false }
  }
]
