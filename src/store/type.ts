import { ILoginState } from "./login/type"
import { ISystemState } from "./main/system/type"
export interface IRootState {
  name: string
  age: number
  entireDepaetment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IRootType = IRootState & IRootWithModule
