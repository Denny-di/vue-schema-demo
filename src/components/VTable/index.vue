<script setup lang="ts" name="VTable">
import { ElMessage, ElMessageBox } from 'element-plus'

interface Props {
  api?: (...args: any[]) => Promise<any>
  beforeRequest?: (params: any) => Promise<boolean | void>
  afterRequest?: (rows: any) => void
  size?: 'small' | 'large' | 'medium' | 'auto'
  closeDefaultRequest?: boolean
  apiParams?: any
  data?: any[]
  code?: string
  columns?: ColumnType[]
  tabsProps?: TabsPropsType
  switchProps?: SwitchPropsType
  filterOptions?: FilterOptionType[]
  actionOptions?: ActionOptionType[]
  loading?: boolean
  total?: number
  pageSize?: number
  pagerProps?: any
  hidePagination?: boolean
  rowMap?: (row: any, index?: number) => any
}

const {
  api,
  beforeRequest,
  afterRequest,
  closeDefaultRequest,
  apiParams,
  code,
  data,
  columns: columnsList,
  tabsProps,
  filterOptions: filterList,
  actionOptions: actionList,
  switchProps,
  loading,
  total,
  hidePagination = false,
  pageSize,
  rowMap
} = defineProps<Props>()

const xTableRef = ref()
const tableTabsRef = ref()
const tableSwitchRef = ref()
const tableFilterRef = ref()

const commonParams = computed(() => {
  const { pageSize, pageNo } = pagination
  const tabParams = tableTabsRef.value?.filterParams ?? {}
  const switchParams = tableSwitchRef.value?.filterParams ?? {}
  const filterParams = tableFilterRef.value?.filterParams ?? {}
  const params = {
    ...tabParams,
    ...switchParams,
    ...filterParams,
    ...apiParams
  }
  if (!hidePagination) {
    params.pageSize = pageSize
    params.pageNo = pageNo
  }
  return params
})

const tabMode = computed(() => tableTabsRef.value?.modelValue)
const currentTab = computed(() => tabsProps?.options?.find((f) => f.value === tabMode.value))

const switchMode = computed(() => tableSwitchRef.value?.modelValue)
const currentMode = computed(() => switchProps?.options?.find((f) => f.value === switchMode.value))

const tableCode = computed(() => currentTab.value?.code ?? switchMode.value ?? code)
const fetchApi = computed(() => currentTab.value?.api ?? currentMode.value?.api ?? api)

const columns = computed(() => currentTab.value?.columns ?? currentMode.value?.columns ?? columnsList ?? [])

const filterOptions = computed(
  () => currentTab.value?.filterOptions ?? currentMode.value?.filterOptions ?? filterList ?? []
)

const actionOptions = computed(
  () => currentTab.value?.actionOptions ?? currentMode.value?.actionOptions ?? actionList ?? []
)

const {
  loading: fetchLoading,
  total: fetchTotal,
  pagination,
  list,
  getList,
  clearList
} = useList({
  api: fetchApi,
  apiParams: commonParams,
  pageSize,
  closeDefaultRequest,
  beforeRequest,
  afterRequest
})

const emit = defineEmits<{
  'table-change': [prop: string, opt?: any]
  'cell-change': [prop: string, opt?: any]
}>()

const tableLoading = computed(() => loading || fetchLoading.value || false)
const tableTotal = computed(() => total || fetchTotal.value || 0)
const rowData = computed(() => {
  const rows = currentTab.value?.data ?? currentMode.value?.data ?? data ?? list.value
  return rowMap ? rows?.map((row, index) => Object.assign(row, rowMap(row, index))) : rows
})

const tableChange = (prop: string, opt?: ChangeOptType) => {
  console.log('table-change =>', prop, opt)
  switch (prop) {
    case 'init':
    case 'tab-change':
    case 'switch-change':
    case 'filter-change':
      if (prop === 'tab-change') {
        tableFilterRef.value?.clear?.()
      }
      pagination.pageNo = 1
      break
  }
  emit('table-change', prop, opt)
  getList()
}

// 单元格或菜单事件
const cellChange = (prop: string, opt: any = {}) => {
  console.log('cell-change => ', prop, opt)
  emit('cell-change', prop, opt)
}

const actionChange = async (prop: string, opt: ActionOptionType) => {
  const { isCheckRow, reconfirm, label } = opt
  const rows = xTableRef.value?.getSelectionRows?.() ?? []
  if (isCheckRow && !rows.length) {
    ElMessage.warning('请至少选择一条数据')
    return
  }
  try {
    let cb: any = null
    if (reconfirm) {
      await ElMessageBox.confirm(`确认是否${label}？`)
      cb = () => {
        ElMessage.success(`${label}成功`)
        tableChange('init')
      }
    }
    cellChange(prop, { rows, cb })
  } catch (error) {
    console.log(error)
  }
}

const initList = () => {
  xTableRef.value?.clearSelection?.()
  tableChange('init')
}

defineExpose({
  xTableRef,
  tableTabsRef,
  tableSwitchRef,
  tableFilterRef,
  commonParams,
  tabMode,
  switchMode,
  initList,
  clearList
})
</script>

<template>
  <div
    class="v-table"
    :class="{
      'v-table--page': !size,
      [`v-table--${size}`]: !!size
    }"
  >
    <slot name="table-header"></slot>

    <slot name="table-tabs">
      <TableTabs v-if="tabsProps" ref="tableTabsRef" v-bind="tabsProps" @change="tableChange('tab-change', $event)" />
    </slot>

    <slot name="table-filter">
      <TableFilter
        v-if="filterOptions?.length"
        ref="tableFilterRef"
        :filter-options="filterOptions"
        @change="tableChange('filter-change', $event)"
      />
    </slot>

    <div class="table-content">
      <slot name="table-left"></slot>

      <div class="table-wrap">
        <div class="flex items-center gap-3 mb-1">
          <TableAction
            v-if="actionOptions?.length"
            :action-options="actionOptions"
            :common-params="commonParams"
            @action-change="actionChange"
            @change="tableChange('action-change', $event)"
          />
          <div class="flex-1 flex justify-end items-center gap-3">
            <slot name="table-header-right"></slot>

            <!-- <TableSwitch
              v-if="switchProps"
              ref="tableSwitchRef"
              v-bind="switchProps"
              @change="tableChange('switch-change', $event)"
            /> -->
          </div>
        </div>
        <XTable
          ref="xTableRef"
          v-loading="tableLoading"
          :row-data="rowData"
          :code="tableCode"
          :columns="columns"
          v-bind="$attrs"
          @cell-change="cellChange"
          @table-change="tableChange"
        >
          <template v-for="(_, slotName) in $slots" :key="slotName" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </XTable>

        <div v-if="!hidePagination && tableTotal > 0" class="flex items-center justify-end h-[48px]">
          <el-pagination
            v-model:current-page="pagination.pageNo"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[20, 50, 100]"
            :total="tableTotal"
            layout="total, sizes, prev, pager, next, jumper"
            background
            v-bind="pagerProps"
            @size-change="tableChange('pagination')"
            @current-change="tableChange('pagination')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-table {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 560px;
  width: 100%;
  &--page {
    height: 100%;
    padding: 3px 6px 6px 6px;
    &:has(.tree-filter) {
      .table-content {
        border: 1px solid rgb(232, 232, 232);
        padding: 12px 0 12px 10px;
        margin-right: 6px;
        border-radius: 6px;
      }
    }
  }
  &--large,
  &--medium,
  &--small,
  &--auto {
    ::v-deep(.el-table__empty-text) {
      padding-top: 0 !important;
      height: initial !important;
      background: none;
    }
  }
  &--large {
    height: 420px;
  }
  &--medium {
    height: 320px;
  }
  &--small {
    height: 200px;
  }
  &--auto {
    height: auto;
    max-height: 560px;
  }
}
</style>
