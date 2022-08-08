import { createStore, Store, useStore as useVuexStore } from "vuex"
import { IRootState, IRootType } from "./type"

import login from "./login/login"

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
    login
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLoginData")
}

export function useStore(): Store<IRootType> {
  return useVuexStore()
}

export default store
