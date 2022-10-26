import { ref } from "vue"
import PageTable from "@/components/page-table"

export function userPageSearch() {
  const pageTableRef = ref<InstanceType<typeof PageTable>>()
  const handleResetClick = () => {
    pageTableRef.value?.getPageData()
  }
  const handleQueryTableData = (formInfo: any) => {
    pageTableRef.value?.getPageData(formInfo)
  }
  return [pageTableRef, handleResetClick, handleQueryTableData]
}
