import { createStore } from "vuex"
import { IRootState } from "./type"

import loginModule from "./login/login"

const store = createStore<IRootState>({
  state() {
    return {
      name: "sy",
      height: 123
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    loginModule
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLoginData")
}

export default store
