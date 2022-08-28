import type { IForm } from "@/baseComponent/form"
export const searchFormConfig: IForm = {
  labelWidth: "120px",
  // layout: { span: 8 },
  // itemStyle: { padding: "5px 10px" },
  formItems: [
    { label: "用户名123", type: "input" },
    { label: "密码", type: "password" },
    {
      label: "运动",
      type: "select",
      placeholder: "请选择运动",
      options: [
        { value: "basketball", title: "篮球" },
        { value: "football", title: "足球" }
      ]
    },
    {
      label: "时间范围",
      type: "datepicter",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ]
}