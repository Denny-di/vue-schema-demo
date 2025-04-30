<script setup lang="ts" name="TableDemo">
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue'

const tabsProps = {
  prop: 'status',
  options: [
    { label: '基础' }
    // { label: '', value: '1' },
    // { label: '已办', value: '2' }
  ]
}

const options = Array.from({ length: 100 }).map((_, i) => ({
  label: `选项${i + 1}`,
  value: `option${i + 1}`
}))

const filterOptions = computed<FilterOptionType[]>(() => [
  { prop: 'xxx1', type: 'el-input', label: '输入框' },
  { prop: 'xxx2', type: 'el-select', label: '下拉框', multiple: true, options },
  { prop: 'xxx3', type: 'el-select-v2', label: '单选虚拟下拉框', options },
  { prop: 'xxx4', type: 'el-input-number', label: '数字输入框' },
  {
    type: 'el-select',
    defaultValue: 'xxx4',
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
  { label: '新增', prop: 'add', icon: CirclePlus },
  {
    label: '编辑',
    prop: 'edit',
    icon: Edit,
    isCheckRow: true,
    props: { type: 'default' }
  },
  {
    label: '删除',
    prop: 'delete',
    icon: Delete,
    reconfirm: true,
    props: { type: 'danger' }
  }
])

const columns = computed<ColumnType[]>(() => [
  { prop: 'xxx1', label: '普通文本' },
  { prop: 'date', label: 'dateFormatter', formatter: dateFormatter },
  { prop: 'a+b/c-d*e', label: 'calcFormatter', formatter: calcFormatter },
  { prop: 'customSlot', label: '自定义插槽' },
  { prop: 'remark', label: '备注' },
  operateColumn(
    [
      { label: '详情', prop: 'detail', type: 'primary', unfold: true },
      { label: '删除', prop: 'detail1', type: 'danger', unfold: true },
      { label: '详情2', prop: 'detail2', type: 'success' },
      { label: '详情3', prop: 'detail3', type: 'warning' }
    ],
    { width: 200, label: '操作（自定义组件）' }
  )
])

const rowData = ref([
  {
    xxx1: '双击单元格复制文本',
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
  }
])

console.log(1111, rowData.value)
</script>

<template>
  <div class="table-demo pr-5 pl-5">
    <VTable
      :data="rowData"
      :columns="columns"
      :tabs-props="tabsProps"
      :filter-options="filterOptions"
      :action-options="actionOptions"
    >
      <template #customSlot="{ value }">
        <el-button type="primary">{{ value }}</el-button>
      </template>
    </VTable>
  </div>
</template>

<style scoped lang="scss"></style>
