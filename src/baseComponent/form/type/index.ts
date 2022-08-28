type IFormType = "input" | "password" | "select" | "datepicter"

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}

export interface IForm {
  labelWidth?: string
  layout?: any
  formItems: IFormItem[]
  itemStyle?: any
}
