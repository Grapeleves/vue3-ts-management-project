import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IRootType } from "./type"

import login from "./login/login"
import system from "./main/system/system"

import { getPageListData } from "@/service/main/system/system"

const store = createStore<IRootState>({
  state() {
    return {
      name: "sy",
      age: 18,
      entireDepaetment: [],
      entireRole: []
    }
  },
  getters: {},
  mutations: {
    getDepartmentData(state, list) {
      state.entireDepaetment = list
    },
    getRoleData(state, list) {
      state.entireRole = list
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

      // 保存数据
      commit("getRoleData", roleData.list)
    }
  },
  modules: {
    login,
    system
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
