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
import router from "@/router"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
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
    }
  },
  actions: {
    // 账号登录
    async accountLogin({ commit }, payload: Account) {
      // 1、登录
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data
      // console.log("token", token)
      // console.log("id", id)
      commit("setToken", token)
      localCache.setCache("token", token)

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

      // 4、跳转到首页
      router.push("/main")
    },
    // 手机号登录
    phoneLogin({ commit }, payload: any) {
      console.log("执行登录phoneLogin", payload)
    },
    // 用户刷新的情况下，重新赋值state中数据
    loadLocalLoginData({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("setToken", token)
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
