import { ref } from "vue"
import pageModal from "@/components/page-modal"

type CallbackFn = (row?: any) => void
export function usePageModal(addCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  // 新增
  const handleAddClick = () => {
    defaultInfo.value = {}
    pageModalRef.value && (pageModalRef.value.visible = true)
    addCb && addCb()
  }
  // 编辑
  const handleEditClick = (row: any) => {
    defaultInfo.value = { ...row }
    pageModalRef.value && (pageModalRef.value.visible = true)
    editCb && editCb(row)
  }

  return [pageModalRef, defaultInfo, handleAddClick, handleEditClick]
}
