import { IForm } from "@/baseComponent/form/type"
export const modalConfig: IForm = {
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
      field: "password",
      label: "密码",
      type: "password",
      placeholder: "请输入密码",
      isHidden: false
    },
    {
      field: "cellphone",
      label: "电话号码",
      type: "input",
      placeholder: "请输入电话号码"
    },
    {
      field: "departmentId",
      label: "部门",
      type: "select",
      placeholder: "请选择部门",
      options: []
    },
    {
      field: "roleId",
      label: "角色",
      type: "select",
      placeholder: "请选择角色",
      options: []
    }
  ],
  layout: { span: 24 }
}
