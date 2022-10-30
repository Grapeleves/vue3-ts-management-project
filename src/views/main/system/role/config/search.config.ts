import type { IForm } from "@/baseComponent/form"
export const searchFormConfig: IForm = {
  labelWidth: "120px",
  formItems: [
    {
      field: "name",
      label: "角色名",
      type: "input",
      placeholder: "请输入角色名"
    },
    {
      field: "intro",
      label: "角色介绍",
      type: "input",
      placeholder: "请输入角色介绍"
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
