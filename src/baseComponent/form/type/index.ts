type IFormType = "input" | "password" | "select" | "datepicter"

export interface IFormItem {
  type: IFormType
  label: string
  field: string
  rules?: any[]
  placeholder?: any
  isHidden?: boolean
  options?: any[]
  otherOptions?: any
}

export interface IForm {
  labelWidth?: string
  layout?: any
  formItems: IFormItem[]
  itemStyle?: any
}
