import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout'
import FrontLayout from '@/layout/FrontLayout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: FrontLayout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/portal/index.vue'),
        name: 'Portal',
        meta: { title: '首页', icon: 'dashboard', noNeedLogin: true }
      },
      {
        path: 'news',
        component: () => import('@/views/portal/news/index'),
        name: 'News',
        meta: { title: '新闻列表', icon: 'list', noNeedLogin: true }
      },
      {
        path: 'news/:id',
        component: () => import('@/views/portal/news/detail'),
        name: 'NewsDetail',
        meta: { title: '新闻详情', icon: 'article', noNeedLogin: true }
      },
      {
        path: 'products',
        component: () => import('@/views/portal/products/index'),
        name: 'Products',
        meta: { title: '产品展示', icon: 'product', noNeedLogin: true }
      },
      {
        path: 'about',
        component: () => import('@/views/portal/about/index'),
        name: 'About',
        meta: { title: '关于我们', icon: 'peoples', noNeedLogin: true }
      },
      {
        path: 'contact',
        component: () => import('@/views/portal/contact/index'),
        name: 'Contact',
        meta: { title: '联系我们', icon: 'phone', noNeedLogin: true }
      },
      {
        path: 'mock',
        component: () => import('@/views/portal/mock/index.vue'),
        name: 'Mock',
      },
      {
        path: 'mock/:type',
        component: () => import('@/views/portal/mock/detail.vue'),
        name: 'MockDetail',
      },
      {
        path: 'mock/:type/:subtype',
        component: () => import('@/views/portal/mock/subDetail.vue'),
        name: 'MockSubDetail',
      },
      // 添加试卷预览和考试页面路由
      {
        path: 'mock/:type/:subtype/preview/:id',
        component: () => import('@/views/portal/mock/preview.vue'),
        name: 'ExamPreview',
      },
      {
        path: 'mock/:type/:subtype/test/:id',
        component: () => import('@/views/portal/mock/test.vue'),
        name: 'ExamTest',
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'AdminIndex',
        meta: { title: '管理首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
});

export default router;
