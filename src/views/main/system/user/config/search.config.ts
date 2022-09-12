import type { IForm } from "@/baseComponent/form"
export const searchFormConfig: IForm = {
  labelWidth: "120px",
  // layout: { span: 8 },
  // itemStyle: { padding: "5px 10px" },
  formItems: [
    {
      field: "name",
      label: "用户名",
      type: "input",
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      label: "真实姓名",
      type: "input",
      placeholder: "请输入真实姓名"
    },
    {
      field: "cellphone",
      label: "电话号码",
      type: "input",
      placeholder: "请输入电话号码"
    },
    {
      field: "enable",
      label: "用户状态",
      type: "select",
      placeholder: "请选择用户状态",
      options: [
        { value: 1, title: "启用" },
        { value: 0, title: "禁用" }
      ]
    },
    {
      field: "createAt",
      label: "创建时间",
      type: "datepicter",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ]
}
