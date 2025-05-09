<script setup lang="ts" name="VFormCell">
import dayjs from 'dayjs'

import { Calendar, ArrowDown, WarningFilled, CircleClose } from '@element-plus/icons-vue'

import { useFormDisabled, useFormItem } from 'element-plus'

interface Props {
  type: FormComponentType
  value?: any
  prop: string
  row: any
  rowIndex: number
  extraFields?: string[]
  rules?: any
  options?: any[]
  valueKey?: string
  labelKey?: string
  events?: any
  props?: any
  apiProps?: any
  isProps?: (row: any) => any
  isApiProps?: (row: any) => any
  isDisabled?: (row: any) => boolean
}
const {
  type,
  prop,
  row,
  rowIndex,
  extraFields,
  events,
  options: opts,
  valueKey = 'value',
  labelKey = 'label',
  props,
  apiProps,
  isProps,
  isApiProps,
  isDisabled
} = defineProps<Props>()

const emit = defineEmits<{
  'cell-change': [prop: string, opt?: any]
  'update:row': [row: any]
}>()

const formDisabled = useFormDisabled()
const parentFormItem = useFormItem()

const options = computed(() =>
  opts
    ?.map((m: any) => ({
      ...m,
      value: m[valueKey],
      label: m[labelKey]
    }))
    ?.filter((m: any) => !isEmpty(m.value))
)

const cellDisabled = computed(
  () => formDisabled.value || isDisabled?.(row) || props?.disabled || isProps?.(row)?.disabled
)
const modelValue = computed({
  get: () => row[prop],
  set(val) {
    const data = { [prop]: val }
    if (extraFields?.length) {
      const currentOpt = options.value?.find((m: any) => m.value === val)
      for (const item of extraFields) {
        const [field, key] = item.split('-')
        data[field] = currentOpt?.[key ?? field]
      }
    }
    emit('update:row', Object.assign(row, data))
  }
})

const isVisible = ['el-select', 'el-select-v2', 'date'].includes(type)

const visible = ref(false)

const change = () => {
  emit('cell-change', prop, { value: modelValue.value, row, rowIndex })
}

const clear = () => {
  modelValue.value = undefined
  change()
}
const mouseenter = () => {
  if (cellDisabled.value) return
  visible.value = true
}

const bindProps = {
  ...props,
  ...isProps?.(row)
}

const bindApiProps = {
  ...apiProps,
  ...isApiProps?.(row)
}

const bindEvents = {
  visibleChange: (v: boolean) => {
    visible.value = v
  },
  ...events
}

const isEmpty = (val: string | null | undefined) =>
  [undefined, null, ''].includes(val) || (Array.isArray(val) && !val.length)
</script>

<template>
  <el-form-item :prop="`${parentFormItem?.formItem?.prop ?? 'rowData'}.${rowIndex}.${prop}`" :rules="rules">
    <div
      v-if="isVisible && !visible"
      class="v-value"
      :class="{ [`v-value--${type}`]: !!type, 'is-disabled': cellDisabled }"
      @mouseenter="mouseenter"
    >
      <template v-if="type === 'date'">
        <el-icon><Calendar /></el-icon>
        <span v-if="value">{{ dayjs(value).format('YYYY-MM-DD') }}</span>
        <span v-else class="placeholder">请选择</span>
      </template>
      <template v-else>
        <span
          v-if="bindProps?.multiple && value?.length"
          class="h-[24px] !leading-[24px] px-[5px] rounded-[4px] -ml-[4px] text-white text-[12px]"
          style="background-color: var(--el-color-primary)"
        >
          + {{ value.length }}
        </span>
        <span v-else-if="!isEmpty(value)">
          {{ options?.find((m: any) => m.value === modelValue)?.label ?? value }}
        </span>
        <span v-else class="placeholder">请选择</span>
        <el-icon v-if="!!type"><ArrowDown /></el-icon>
      </template>
      <el-icon v-if="!isEmpty(value) && !rules?.required && !cellDisabled" class="clear" @click.stop="clear">
        <CircleClose />
      </el-icon>
    </div>

    <VFormItem
      v-else-if="!!type"
      v-model="modelValue"
      :type="type"
      :prop="prop"
      :disabled="isDisabled?.(row)"
      :props="bindProps"
      :api-props="bindApiProps"
      :events="bindEvents"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      v-bind="$attrs"
      @change="change"
    />

    <template v-else> {{ modelValue }}</template>

    <template #error="{ error }">
      <span>
        <el-tooltip :content="error" placement="top">
          <el-icon class="warn"><WarningFilled /></el-icon>
        </el-tooltip>
      </span>
    </template>
  </el-form-item>
</template>

<style scoped lang="scss">
.el-form-item {
  .warn {
    display: none;
  }
  &.is-error {
    position: relative;
    ::v-deep() {
      .el-form-item__content {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 2px;
      }
      .el-select-v2__wrapper {
        border: 0;
        height: 32px;
      }
    }
    .v-value {
      border-color: var(--el-color-danger);
    }
    .warn {
      display: block;
      cursor: pointer;
      color: var(--el-color-danger);
      font-size: 16px;
      margin-right: 0;
    }
  }
}
.v-value {
  width: 100%;
  height: 32px;
  padding: 0px 11px;
  display: flex;
  align-items: center;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  font-size: 14px;
  box-sizing: border-box;
  background-color: #fff;
  color: var(--el-text-color-regular);
  cursor: pointer;
  position: relative;
  &:not(.v-value--date) {
    justify-content: space-between;
  }
  &:hover {
    border-color: var(--el-border-color-hover);
    .clear {
      display: inherit;
    }
  }
  &.is-disabled {
    cursor: not-allowed;
    background-color: rgb(235, 242, 247);
    color: rgb(56, 61, 63);
    border-color: var(--el-disabled-border-color);
    .placeholder {
      color: rgb(56, 61, 63);
    }
  }
  &--date {
    padding: 0 10px;
    .el-icon {
      margin-right: 8px;
    }
  }

  .clear {
    display: none;
    position: absolute;
    right: 0px;
    background-color: #fff;
    padding: 4px;
    width: 2em;
    height: 2em;
  }
  > span {
    line-height: 1;
    max-width: 80%;
    display: inline-block;
    overflow: hidden;
  }
  .placeholder {
    color: #a8abb2;
  }
  .el-icon {
    color: var(--el-text-color-placeholder);
    font-size: 14px;
  }
}
</style>
