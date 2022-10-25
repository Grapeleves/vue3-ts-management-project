export const tableConfig = {
  tableTitle: "菜单列表",
  showSelection: false,
  showIndex: false,
  childrenProp: {
    rowKey: "id",
    treeProps: {
      children: "children"
    }
  },
  tableColumns: [
    {
      prop: "name",
      label: "菜单名称",
      minWidth: "120"
    },
    {
      prop: "type",
      label: "类型",
      minWidth: "60"
    },
    {
      prop: "url",
      label: "菜单url",
      minWidth: "100"
    },
    {
      prop: "permission",
      label: "按钮权限",
      minWidth: "100"
    },
    {
      prop: "icon",
      label: "菜单图标",
      minWidth: "100"
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
  ],
  showFooter: false
}
