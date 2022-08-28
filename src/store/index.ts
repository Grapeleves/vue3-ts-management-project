import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IRootType } from "./type"

import login from "./login/login"
import system from "./main/system/system"

const store = createStore<IRootState>({
  state() {
    return {
      name: "sy",
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLoginData")
}

export function useStore(): Store<IRootType> {
  return useVuexStore()
}

export default store
