<script setup lang="ts" name="">
interface Props {
  code?: string
  rowData?: any[]
  columns?: ColumnType[]
  hideProps?: string[]
  rowHeight?: number | string
  cellWidth?: number | string
  minCellWidth?: number | string
  enabledTree?: boolean
  enabledExpand?: boolean
  enabledIndex?: boolean
  enabledSort?: boolean
  enabledSelection?: boolean
  enabledSingle?: boolean
  summaryProps?: string[]
  rowKey?: string
  selectable?: (row: any, index?: number) => boolean
}

const {
  code,
  rowData,
  columns = [],
  hideProps,
  cellWidth,
  minCellWidth = 100,
  summaryProps,
  rowKey = 'id',
  selectable
} = defineProps<Props>()

const emit = defineEmits<{
  'table-change': [prop: string, opt?: any]
  'cell-change': [prop: string, opt?: any]
  'selection-change': [rows: any[]]
  'current-change': [currentRow: any, oldCurrentRow?: any]
}>()

const { columnList, updateCacheColumns } = useColumns(
  computed(() => ({
    code,
    columns,
    hideProps,
    cellWidth,
    minCellWidth
  }))
)

const tableRef = ref()

const tableChange = (prop: string, opt: any = {}) => {
  currentRowById.value = undefined
  console.log('table-change => ', prop, opt)
  if (prop === 'refresh-columns') updateCacheColumns()
  emit('table-change', prop, opt)
}

// 单元格或菜单事件
const cellChange = (prop: string, opt: any = {}) => {
  console.log('cell-change => ', prop, opt)
  emit('cell-change', prop, opt)
}

const selectionChange = (rows: any[]) => {
  emit('selection-change', rows)
}

const toggleSelection = (rows: any[]) => {
  if (rows?.length) rows.forEach((row) => tableRef.value!.toggleRowSelection(row))
  else tableRef.value!.clearSelection()
}

const currentRowById = ref<number | string>()
const currentChange = (currentRow: any, oldCurrentRow?: any) => {
  if (!currentRow || (selectable && !selectable(currentRow))) return
  currentRowById.value = currentRow[rowKey]
  emit('current-change', currentRow, oldCurrentRow)
}

const getCurrentRow = () => rowData?.find((f: any) => f[rowKey] === currentRowById.value)

const rowClassName = ({ row }: any) => (selectable && !selectable(row) ? 'is-disabled' : '')

const summaryMethod = ({ columns, data }: any) => {
  const sums: string[] = []
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = '总计'
      return
    }
    const { property: prop } = column
    if (summaryProps?.includes(prop)) {
      const values = data.map((m: any) => Number(m[prop]) || 0)
      sums[index] = values.reduce((a: number, b: number) => a + b, 0)
    } else sums[index] = '-'
  })
  return sums
}

defineExpose({
  tableRef,
  getCurrentRow,
  toggleSelection,
  getSelectionRows: () => tableRef.value?.getSelectionRows?.(),
  clearSelection: () => tableRef.value?.clearSelection?.()
})
</script>

<template>
  <div class="x-table">
    <el-table
      ref="tableRef"
      :data="rowData"
      :highlight-current-row="enabledSingle"
      :row-style="{ height: rowHeight }"
      :row-class-name="rowClassName"
      :summary-method="summaryMethod"
      show-overflow-tooltip
      border
      v-bind="$attrs"
      @selection-change="selectionChange"
      @current-change="currentChange"
    >
      <el-table-column v-if="enabledExpand" type="expand" :width="40">
        <template #default="scope">
          <slot name="expand" v-bind="scope"></slot>
        </template>
      </el-table-column>

      <el-table-column v-if="enabledTree" prop="__tree__" :width="40" />

      <el-table-column v-if="enabledSelection" type="selection" :selectable="selectable" :width="40" />

      <el-table-column v-if="enabledSingle" :width="40">
        <template #default="{ row, $index }">
          <el-radio v-model="currentRowById" :label="row[rowKey]" :disabled="selectable && !selectable(row, $index)">
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>

      <el-table-column v-if="enabledIndex" type="index" label="序号" :width="50" />

      <slot></slot>

      <template v-for="column in columnList" :key="column.prop">
        <VColumn :column="column" :enabled-sort="enabledSort" @cell-change="cellChange" @table-change="tableChange">
          <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </VColumn>
      </template>

      <template v-for="slotName in ['empty', 'append']" :key="slotName" #[slotName]>
        <slot :name="slotName"></slot>
      </template>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.x-table {
  width: 100%;
  height: 100%;
  .el-table {
    width: 100%;
    height: 100%;
  }
}
</style>
