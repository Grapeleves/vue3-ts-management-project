// 接口返回结果类型
export interface ResponseType<T = any> {
  code: number
  data: T
}
