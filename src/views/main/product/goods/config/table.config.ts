export const tableConfig = {
  tableTitle: "商品列表",
  showSelection: true,
  showIndex: true,
  tableColumns: [
    {
      prop: "name",
      label: "商品名称",
      minWidth: "120"
    },
    {
      prop: "oldPrice",
      label: "原价",
      minWidth: "100"
    },
    {
      prop: "newPrice",
      label: "现价",
      minWidth: "100"
    },
    {
      prop: "imgUrl",
      label: "商品图片",
      minWidth: "100",
      slotName: "image"
    },
    {
      prop: "status",
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
