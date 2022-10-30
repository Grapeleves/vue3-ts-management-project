export const tableConfig = {
  tableTitle: "用户列表",
  showSelection: true,
  showIndex: true,
  tableColumns: [
    {
      prop: "name",
      label: "用户名",
      minWidth: "120"
    },
    {
      prop: "intro",
      label: "角色介绍",
      minWidth: "120"
    },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "120",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "120",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "120",
      slotName: "handler"
    }
  ]
}
