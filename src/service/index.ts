import SYRequest from "./request/request"
import { BASE_URL, TIME_OUT } from "./request/config"

import localCache from "@/utils/catch"

const syRequest = new SYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log("请求成功的拦截")
      const token = localCache.getCache("token")
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      // console.log("请求失败的拦截")
      return error
    },
    responseInterceptor: (res) => {
      // console.log("响应成功的拦截")
      return res
    },
    responseInterceptorCatch: (error) => {
      // console.log("响应失败的拦截")
      return error
    }
  }
})

export default syRequest
