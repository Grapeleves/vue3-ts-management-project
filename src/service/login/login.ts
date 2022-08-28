import syRequest from "../index"
import type { Account, LoginResponseDataType } from "./login-type"
import type { ResponseType } from "../type"

enum loginAPI {
  accountLogin = "/login",
  loginUserInfo = "/users/",
  userMenus = "/role/"
}

// 登录
export function accountLoginRequest(account: Account) {
  return syRequest.post<ResponseType<LoginResponseDataType>>({
    url: loginAPI.accountLogin,
    data: account
  })
}

// 获取用户信息
export function requestUserInfo(id: number) {
  return syRequest.get<ResponseType>({
    url: loginAPI.loginUserInfo + id,
    showLoading: false
  })
}

// 获取当前用户的菜单权限
export function getUserPowerMenus(id: number) {
  return syRequest.get<ResponseType>({
    url: loginAPI.userMenus + id + "/menu",
    showLoading: false
  })
}
