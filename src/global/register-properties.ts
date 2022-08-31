import { App } from "vue"

import { formatUTCSting } from "@/utils/data-format"

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUTCSting(value)
    }
  }
}
