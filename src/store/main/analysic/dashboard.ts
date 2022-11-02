import { Module } from "vuex"

import type { IDashboardState } from "./type"
import type { IRootState } from "../../type"

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/main/analysic/dashboard"

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      adddressGoodsSale: []
    }
  },
  mutations: {
    getCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    getCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    getCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    getAddressGoodsSale(state, list) {
      state.adddressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      commit("getCategoryGoodsCount", categoryGoodsCountResult.data)

      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      commit("getCategoryGoodsSale", categoryGoodsSaleResult.data)

      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      commit("getCategoryGoodsFavor", categoryGoodsFavorResult.data)

      const addressGoodsSaleResult = await getAddressGoodsSale()
      commit("getAddressGoodsSale", addressGoodsSaleResult.data)
    }
  }
}

export default dashboardModule
