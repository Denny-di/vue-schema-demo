<script setup lang="ts" name="TableDemo">
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { options, treeData } from './data'

const tabsProps = {
  prop: 'status',
  options: [{ label: '表格' }]
}

const filterOptions = computed<FilterOptionType[]>(() => [
  { prop: 'xxx1', type: 'el-input', label: '输入框' },
  { prop: 'xxx2', type: 'el-select', label: '下拉框', multiple: true, options },
  { prop: 'xxx3', type: 'el-select-v2', label: '单选虚拟下拉框', options },
  { prop: 'xxx9', type: 'el-input-number', label: '数字输入框' },
  {
    prop: 'xxx6',
    type: 'el-tree-select',
    label: '树形下拉框',
    options: treeData
  },
  {
    type: 'el-select',
    defaultValue: 'xxx4',
    childType: 'el-select-v2',
    options: [
      {
        label: '虚拟下拉框',
        value: 'xxx4',
        child: { type: 'el-select-v2', multiple: true, options }
      },
      {
        label: '单选下拉框',
        value: 'xxx5',
        child: { type: 'el-select', options }
      },
      { label: '输入框二', value: 'remark', child: { type: 'el-input' } }
    ]
  },
  {
    type: 'el-select',
    defaultValue: 'createTime',
    childType: 'daterange',
    options: [
      { label: '创建时间', value: 'createTime' },
      { label: '更新时间', value: 'startTime-endTime' }
    ]
  }
])

const actionOptions = computed<ActionOptionType[]>(() => [
  { label: '新增', prop: 'add', icon: markRaw(CirclePlus) },
  {
    label: '删除',
    prop: 'delete',
    icon: markRaw(Delete),
    reconfirm: true,
    props: { type: 'danger' }
  }
])

const columns = computed<ColumnType[]>(() => [
  { prop: 'xxx1', label: '普通文本' },
  { prop: 'date', label: 'dateFormatter', formatter: dateFormatter },
  { prop: 'a+b/c-d*e', label: 'calcFormatter', formatter: calcFormatter },
  { prop: 'customSlot', label: '自定义插槽' },
  {
    prop: 'xx2',
    label: '表头分组',
    children: [
      { prop: 'xxx1', label: '普通文本', width: 180 },
      { prop: 'a+b/c-d*e', label: 'calcFormatter', formatter: calcFormatter },
      { prop: 'customSlot', label: '自定义插槽' }
    ]
  },
  operateColumn(
    [
      { label: '编辑', prop: 'edit', icon: markRaw(Edit), unfold: true },
      { label: '详情', prop: 'detail', type: 'primary', unfold: true },
      { label: '删除', prop: 'delete', type: 'danger' },
      { label: '详情2', prop: 'detail2', type: 'success' },
      { label: '详情3', prop: 'detail3', type: 'warning' }
    ],
    { width: 200, label: '操作（自定义组件）' }
  )
])

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getList = async () => {
  await sleep(1000)
  return {
    list: Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      xxx1: '双击单元格复制文本' + i,
      age: 18,
      address: 'New York No. 1 Lake Park',
      status: '基础',
      date: new Date().getTime(),
      a: 100,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      customSlot: '插槽'
    })),
    total: 100
  }
}
const VFormDialogRef = ref()
const propAction = {
  add: () => {
    VFormDialogRef.value?.open('add')
  },
  edit: (opt?: any) => {
    const { row } = opt ?? {}
    VFormDialogRef.value?.open('edit', row)
  },
  delete: async (opt?: any) => {
    console.log('删除', opt)
    ElMessage.success('删除')
  },
  detail: (opt?: any) => {
    const { row } = opt ?? {}
    VFormDialogRef.value?.open('detail', row)
  }
}
const cellChange = async (prop: string, opt: any) => {
  console.log('cell-change =>', prop, opt)
  const { cb } = opt
  await propAction[prop as keyof typeof propAction]?.(opt)
  cb?.()
}

const VTableRef = ref()
const refresh = () => {
  ElMessage.success('刷新表格')
  VTableRef.value?.initList()
}
</script>

<template>
  <div class="table-demo pr-5 pl-5">
    <VTable
      ref="VTableRef"
      :api="getList"
      :columns="columns"
      :tabs-props="tabsProps"
      :filter-options="filterOptions"
      :action-options="actionOptions"
      enabled-selection
      @cell-change="cellChange"
    >
      <template #customSlot="{ value }">
        <el-button type="primary" @click="ElMessage.success(value)">
          {{ value }}
        </el-button>
      </template>
    </VTable>

    <CreateDialog ref="VFormDialogRef" @refresh="refresh"></CreateDialog>
  </div>
</template>

<style scoped lang="scss"></style>
