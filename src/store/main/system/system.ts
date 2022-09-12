import { Module } from "vuex"
import type { ISystemState } from "./type"
import type { IRootState } from "../../type"

import { getPageListData } from "@/service/main"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0
    }
  },
  getters: {
    pageListData(state) {
      // getters可以返回函数从而传递参数
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount) {
      state.usersCount = userCount
    }
  },
  actions: {
    // 获取页面数据
    async getPageList({ commit }, playload: any) {
      // 获取url、params
      const pageName = playload.pageName
      const url = `/${pageName}/list`
      const params = playload.pageParams

      // 发送请求获取数据
      const pageResult = await getPageListData(url, params)

      // 数据存储到state
      const { list, totalCount } = pageResult.data

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    }
  }
}

export default systemModule
