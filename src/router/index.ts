import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:catchAll(.*)",
      name: '404',
      component: () => import('@/error/404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/IndexView.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: "/artical/:id",
      name: "artical",
      component: () => import('@/views/ArticalView.vue'),
      meta: {
        title: "文章"
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      meta: {
        title: '用户中心'
      },
    },
    {
      path: '/user/login',
      name: 'userlogin',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        title: '用户登录'
      },
    }
  ]
});

// 路由导航守卫设置标题  
router.beforeEach((to, from, next) => {
  // 如果路由有 meta.title 属性，则使用它，否则使用默认标题  
  document.title = to.meta.title as string || '默认标题';
  next();
});

export default router;