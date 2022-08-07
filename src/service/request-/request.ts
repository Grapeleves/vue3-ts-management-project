import axios from "axios"
import type { AxiosInstance } from "axios"
import { ElLoading } from "element-plus"

import type { SYRequestConfig, SYRequestInterceptors } from "./type"

class SYRequest {
  instance: AxiosInstance
  interceptors?: SYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: SYRequestConfig) {
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加公共的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("所有实例，请求成功的拦截")

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据...",
            background: "rgba(0,0,0,0.3)"
          })
        }

        return config
      },
      (err) => {
        // console.log("所有实例，请求失败的拦截")
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("所有实例，响应成功的拦截")
        this.loading?.close()
        const data = res.data
        return res
      },
      (err) => {
        // console.log("所有实例，响应失败的拦截")
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: SYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对返回的数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 请求结束之后，将showLoading重新设置回初始化值true，防止下一个请求需要展示loading
          this.showLoading = true
          console.log(res)
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }

  get<T>(config: SYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T>(config: SYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T>(config: SYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" })
  }

  patch<T>(config: SYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" })
  }
}

export default SYRequest
