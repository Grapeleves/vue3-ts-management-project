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

// 新建接口
export function createPageData(url: string, newData: any) {
  return syRequest.post<ResponseType>({
    url,
    data: newData
  })
}

// 编辑接口
export function editPageData(url: string, editData: any) {
  return syRequest.patch<ResponseType>({
    url,
    data: editData
  })
}
