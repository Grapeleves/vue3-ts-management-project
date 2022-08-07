import { createStore } from "vuex"
import { IRootState } from "./type"

import login from "./login/login"

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
    login
  }
})

export function setupStore() {
  store.dispatch("login/loadLocalLoginData")
}

export default store
