import OperateCell from '@/components/VTable/components/cell/OperateCell.vue'

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
