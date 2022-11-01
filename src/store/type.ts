import { ILoginState } from "./login/type"
import { ISystemState } from "./main/system/type"
import { IDashboardState } from "./main/analysic/type"
export interface IRootState {
  name: string
  age: number
  entireDepaetment: any[]
  entireRole: any[]
  entireMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IRootType = IRootState & IRootWithModule
