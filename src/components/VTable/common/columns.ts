import OperateCell from '@/components/VTable/components/cell/OperateCell.vue'
import VFormCell from '@/components/VForm/components/VFormCell.vue'

/**
 * 操作列
 * @param options 操作项配置
 * @param col 列配置
 * @prop operate
 */
export const operateColumn = (options: OperateOptionType[], col?: Partial<ColumnType>): ColumnType => ({
  label: '操作',
  prop: 'operate',
  width: 120,
  fixed: 'right',
  sortable: false,
  customCell: { value: markRaw(OperateCell), options, ...col?.customCell },
  ...col
})

/**
 * 表单 单元格
 * @param col 列配置
 */
export const formCellColumn = (col: ColumnType) => ({
  minWidth: 150,
  ...col,
  customCell: { value: markRaw(VFormCell), ...col.customCell }
})
