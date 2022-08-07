import type { AxiosRequestConfig, AxiosResponse } from "axios"

export interface SYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface SYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: SYRequestInterceptors<T>
  showLoading?: boolean
}
