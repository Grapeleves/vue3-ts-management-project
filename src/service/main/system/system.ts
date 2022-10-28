import syRequest from "../../index"
import { ResponseType } from "../../type"

// 界面数据获取接口
export function getPageListData(url: string, queryParams: any) {
  return syRequest.post<ResponseType>({
    url,
    data: queryParams
  })
}

// 删除接口
// url:/users/id
export function deletePageData(url: string) {
  return syRequest.delete<ResponseType>({
    url
  })
}
