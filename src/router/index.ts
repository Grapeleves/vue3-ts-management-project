import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import localCache from "@/utils/catch"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    component: () => import("@/views/main/main.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// 导航首位
router.beforeEach((to) => {
  // console.log(to)
  // 如果用户不是跳转到登录页面，要先判断是否有token，没有的话要先登录
  if (to.path !== "/login") {
    const token = localCache.getCache("token")
    if (!token) {
      return "/login"
    }
  }
})

export default router
