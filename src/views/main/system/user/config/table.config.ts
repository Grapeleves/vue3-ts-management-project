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
      prop: "realname",
      label: "真实姓名",
      minWidth: "120"
    },
    {
      prop: "cellphone",
      label: "手机号码",
      minWidth: "120"
    },
    {
      prop: "enable",
      label: "状态",
      minWidth: "120",
      slotName: "status"
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
