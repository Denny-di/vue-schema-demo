<script setup lang="ts" name="VColumn">
interface Props {
  column: ColumnType
  enabledSort?: boolean
}

const { column } = defineProps<Props>()

const emit = defineEmits<{
  'table-change': [prop: string, opt?: any]
  'cell-change': [prop: string, opt?: any]
}>()

const slots = defineSlots()
const tableSlots = Object.keys(slots)

const tableChange = (prop: string, opt: any = {}) => {
  console.log('table-change =>　', prop, opt)
  emit('table-change', prop, opt)
}

// 单元格或菜单事件
const cellChange = (prop: string, opt: any = {}) => {
  emit('cell-change', prop, opt)
}
</script>

<template>
  <!-- 表头分组 -->
  <el-table-column v-if="column.children?.length" :label="column.label" :prop="column.prop">
    <VColumn v-for="sub in column.children" :key="sub.prop" :column="sub" @cell-change="cellChange">
      <!-- 自定义插槽 -->
      <template v-for="(, slotName) in $slots" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </VColumn>

    <!-- 自定义列头部 {prop}--header -->
    <template #header="scope">
      <slot
        v-if="tableSlots.includes(`${column.prop}--header`)"
        v-bind="scope"
        :name="`${column.prop}--header`"
        :prop="`${column.prop}--header`"
        :value="column.label"
      ></slot>
      <template v-else>{{ column.label }}</template>
    </template>
  </el-table-column>

  <el-table-column v-else :sortable="enabledSort" v-bind="column">
    <!-- 自定义列 -->
    <template #default="scope">
      <template v-if="scope.row[column.prop]?.includes?.('****')">
        {{ scope.row[column.prop] }}
      </template>
      <slot
        v-else-if="scope.$index >= 0 && tableSlots.includes(column.prop)"
        v-bind="scope"
        :value="scope.row[column.prop]"
        :row-index="scope.$index"
        :name="column.prop"
      ></slot>
      <component
        v-bind="column.customCell"
        :is="column.customCell.isValue?.(scope.row) ? column.customCell.isValue(scope.row) : column.customCell.value"
        v-else-if="column.customCell"
        v-model:row="scope.row"
        :value="scope.row[column.prop]"
        :row-index="scope.$index"
        :prop="column.prop"
        @cell-change="cellChange"
        @table-change="tableChange"
      />
      <template v-else-if="!column?.formatter">
        <el-text v-if="column.textType" v-copy :type="column.textType">
          {{ scope.row[column.prop] }}
        </el-text>
        <span v-else-if="typeof scope.row[column.prop] === 'number'" v-copy>
          {{ +scope.row[column.prop].toFixed(2) }}
        </span>
        <template v-else-if="Number.isNaN(scope.row[column.prop]) || scope.row[column.prop] === ''"> - </template>
        <span v-else v-copy>{{ scope.row[column.prop] ?? '-' }}</span>
      </template>
    </template>

    <!-- 自定义列头部 {prop}--header -->
    <template #header="scope">
      <slot
        v-if="tableSlots.includes(`${column.prop}--header`)"
        v-bind="scope"
        :name="`${column.prop}--header`"
        :prop="`${column.prop}--header`"
        :value="column.label"
      ></slot>
      <template v-else>
        <span v-if="column.customCell?.rules?.required" style="color: var(--el-color-danger)"> * </span>
        {{ column.label }}
      </template>
    </template>
  </el-table-column>
</template>

<style scoped lang="scss"></style>
