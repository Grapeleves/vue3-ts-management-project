import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IRootType } from "./type"

import login from "./login/login"
import system from "./main/system/system"
import dashboard from "./main/analysic/dashboard"

import { getPageListData } from "@/service/main/system/system"

const store = createStore<IRootState>({
  state() {
    return {
      name: "sy",
      age: 18,
      entireDepaetment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  mutations: {
    getDepartmentData(state, list) {
      state.entireDepaetment = list
    },
    getRoleData(state, list) {
      state.entireRole = list
    },
    getMenuData(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门数据
      const { data: departmentData } = await getPageListData(
        "/department/list",
        {
          offset: 0,
          size: 100
        }
      )
      commit("getDepartmentData", departmentData.list)

      // 请求角色数据
      const { data: roleData } = await getPageListData("/role/list", {
        offset: 0,
        size: 100
      })
      commit("getRoleData", roleData.list)

      // 请求菜单数据
      const { data: menuData } = await getPageListData("/menu/list", {})
      commit("getMenuData", menuData.list)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLoginData")
  // store.dispatch("getInitialDataAction")
}

export function useStore(): Store<IRootType> {
  return useVuexStore()
}

export default store
