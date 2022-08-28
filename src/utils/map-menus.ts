import type { RouteRecordRaw } from "vue-router"

let firstMenu: any = null

// 根据用户的权限菜单匹配路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1、加载所有默认的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context 是 webpack提供的工具函数
  // 第一个入参：要获取的文件的路径，第二个参数：是否递归查找，第三个参数：正则表达式用来匹配文件类型
  const routeFiles = require.context("../router/main", true, /\.ts/)
  routeFiles.keys().forEach((item) => {
    // console.log(item)
    const route = require("../router/main" + item.slice(1))
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2、根据菜单获取需要添加的路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          // 将第一个菜单保存下来【系统总览-核心技术】
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

// 在userMenus中匹配路由
export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
