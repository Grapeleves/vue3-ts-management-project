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
