export interface VTableType {
  code?: string
  api?: (...args: any[]) => Promise<any>
  data?: any[]
  columns?: ColumnType[]
  // switchProps?: SwitchPropsType
  filterOptions?: FilterOptionType[]
  actionOptions?: ActionOptionType[]
}

export interface ColumnType {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  sortable?: boolean
  children?: ColumnType[]
  align?: 'left' | 'center' | 'right'
  fixed?: boolean | 'left' | 'right'
  showOverflowTooltip?: boolean
  formatter?: (row: any, column: any, cellValue: any, index: number) => VNode | string
  hidden?: boolean
  sort?: number
  switchMode?: string | number
  textType?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  customCell?: {
    value?: Component
    [key: string]: any
  }
}

export interface OptionType {
  label: string
  value: number | string
}

export interface ChangeOptType {
  [x: string]: number | string | undefined
}

export interface TabsPropsType {
  prop?: string
  defaultValue?: number | string
  options?: Array<VTableType & { label: string; value?: number | string }>
}

export interface FilterOptionType {
  props?: any
  prop?: string
  type: FormComponentType
  models?: ModelType[]
  defaultValue?: number | string | boolean | Array<number | string | boolean>
  label?: string
  hidden?: boolean
  multiple?: boolean
  placeholder?: string
  className?: string
  width?: number | string
  options?: Array<{
    label: string
    value: string | number | boolean
    child?: FilterOptionType
  }>
  childType?: FormComponentType
  child?: FilterOptionType
  clearFields?: string[]
}

export interface ActionOptionType {
  props?: any
  label: string
  prop: string
  componentType?: 'button'
  icon?: string | Component
  isCheckRow?: boolean
  hidden?: boolean
  apiProps?: any
  reconfirm?: boolean
  beforeOpen?: () => Promise<any>
}

export interface SwitchPropsType {
  prop?: string
  defaultValue?: number | string
  options: Array<
    VTableType & {
      label: string
      value: string
    }
  >
}

export interface OperateOptionType {
  label: string
  prop: string
  type?: 'primary' | 'danger' | 'default' | 'warning' | 'success' | 'info'
  icon?: string
  unfold?: boolean
  hidden?: boolean
  disabled?: boolean
  reconfirm?: boolean
  isHidden?: (row: any) => boolean
  showValues?: Array<string | number | boolean>
}
