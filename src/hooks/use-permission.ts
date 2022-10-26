import { useStore } from "@/store"

// 查看是否拥有某个按钮权限
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`

  return permissions.includes(verifyPermission)
}

export default usePermission
