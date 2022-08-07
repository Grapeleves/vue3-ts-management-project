export interface Account {
  name: string
  password: string
}

// 登录接口返回的结果中data的类型
export interface LoginResponseDataType {
  id: number
  name: string
  token: string
}

// 接口返回结果类型
export interface ResponseType<T = any> {
  code: number
  data: T
}
