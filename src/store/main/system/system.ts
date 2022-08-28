import { Module } from "vuex"
import type { ISystemState } from "./type"
import type { IRootState } from "../../type"

import { getPageListData } from "@/service/main"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  getters: {},
  mutations: {
    changeUserList(state, userList) {
      state.userList = userList
    },
    changeUserCount(state, userCount) {
      state.userCount = userCount
    }
  },
  actions: {
    // 获取页面数据
    async getPageList({ commit }, playload: any) {
      const url = playload.pageUrl
      const params = playload.pageParams
      // 发送请求获取数据
      const pageResult = await getPageListData(url, params)
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit("changeUserList", list)
      commit("changeUserCount", totalCount)
    }
  }
}

export default systemModule
