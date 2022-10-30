import type { Module } from "vuex"
import type { IRootState } from "../type"
import type { ILoginState } from "./type"
import {
  accountLoginRequest,
  requestUserInfo,
  getUserPowerMenus
} from "@/service/login/login"
import type { Account } from "@/service/login/login-type"
import localCache from "@/utils/catch"
import { mapMenusToRoutes, mapMenusToPermission } from "@/utils/map-menus"
import router from "@/router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    setUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 动态生成路由
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)
      // 将路由添加到main路由的children中  routes => route.main.children
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 获取用户按钮的权限
      const permissions = mapMenusToPermission(userMenus)
      // console.log(permissions)
      state.permissions = permissions
    }
  },
  actions: {
    // 账号登录
    async accountLogin({ commit, dispatch }, payload: Account) {
      // 1、登录
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data
      commit("setToken", token)
      localCache.setCache("token", token)

      // 获取初始化数据
      dispatch("getInitialDataAction", null, { root: true })

      // 2、获取用户信息
      const userInfoRes = await requestUserInfo(id)
      const userInfo = userInfoRes.data
      // console.log("userInfo", userInfo)
      commit("setUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)

      // 3、获取当前用户的菜单权限
      const userMenusRes = await getUserPowerMenus(userInfo.role.id)
      const userMenus = userMenusRes.data
      // console.log("userMenus", userMenus)
      commit("setUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)

      // 4、跳转到首页
      router.push("/main")
    },
    // 手机号登录
    phoneLogin({ commit }, payload: any) {
      console.log("执行登录phoneLogin", payload)
    },
    // 用户刷新的情况下，重新赋值state中数据
    loadLocalLoginData({ commit, dispatch }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("setToken", token)
        // 获取初始化数据
        dispatch("getInitialDataAction", null, { root: true })
      }

      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("setUserInfo", userInfo)
      }

      const userMenus = localCache.getCache("userMenus")
      if (userMenus) {
        commit("setUserMenus", userMenus)
      }
    }
  }
}

export default loginModule
