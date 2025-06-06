export interface SchemaType {
  type: FormComponentType
  prop: string
  label?: string
  span?: number
  events?: any
  props?: any
  itemProps?: any
  content?: any
  appendProps?: any
  hidden?: boolean
  options?: any[]
}

export type FormComponentType =
  | 'el-input'
  | 'el-input-number'
  | 'el-select'
  | 'el-select-v2'
  | 'el-cascader'
  | 'el-tree-select'
  | 'el-radio-group'
  | 'el-checkbox-group'
  | 'el-switch'
  | 'el-rate'
  | 'el-color-picker'
  | 'el-slider'
  | 'el-divider'
  | 'el-tabs'
  | 'date'
  | 'daterange'
  | 'textarea'
  | 'table'
  | 'text'
  | 'content'
  | 'options'

export type ModelType = 'modelValue' | string

export interface PanelType {
  type?: 'date' | 'options' | 'table' | 'tab' | 'content' | 'divider'
  prop?: string
  label?: string
  span?: number
  props?: any
  hidden?: boolean
  content?: any
  options?: Array<PanelType & { label?: string; value?: string; model?: any }>
  children?: PanelType[]
}
