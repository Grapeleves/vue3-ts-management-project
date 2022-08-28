import syRequest from "../../index"
import { ResponseType } from "../../type"

export function getPageListData(url: string, queryParams: any) {
  return syRequest.post<ResponseType>({
    url,
    data: queryParams
  })
}
