import { createApp } from "vue"
import "normalize.css"
import "./assets/css/index.less"
import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import "element-plus/dist/index.css"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { setupStore } from "./store"

import globalRegister from "./global"

// createApp(App).mount("#app")
const app = createApp(App)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount("#app")

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
