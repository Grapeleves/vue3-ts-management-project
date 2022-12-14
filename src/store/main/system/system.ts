import { Module } from "vuex"
import type { ISystemState } from "./type"
import type { IRootState } from "../../type"

import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      // getters可以返回函数从而传递参数
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      // getters可以返回函数从而传递参数
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.usersCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
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
    },

    // 删除数据
    async deletePageData({ dispatch }, playload: any) {
      const pageName = playload.pageName
      const id = playload.id
      const deleteUrl = `/${pageName}/${id}`

      await deletePageData(deleteUrl)

      dispatch("getPageList", {
        pageName,
        pageParams: {
          offset: 0,
          size: 10
        }
      })
    },

    // 新建
    async createPageData({ dispatch }, playload: any) {
      const { pageName, newData } = playload
      console.log(newData)
      const url = `/${pageName}`
      await createPageData(url, newData)

      dispatch("getPageList", {
        pageName,
        pageParams: {
          offset: 0,
          size: 10
        }
      })
    },

    // 修改
    async editPageData({ dispatch }, playload: any) {
      const { pageName, editData, id } = playload
      const url = `/${pageName}/${id}`
      await editPageData(url, editData)

      dispatch("getPageList", {
        pageName,
        pageParams: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
