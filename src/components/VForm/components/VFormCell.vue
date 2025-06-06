<script setup lang="ts" name="VFormCell">
import dayjs from 'dayjs'

import { Calendar, ArrowDown, WarningFilled, CircleClose } from '@element-plus/icons-vue'

import { useFormDisabled, useFormItem } from 'element-plus'

interface Props {
  type: FormComponentType
  value?: any
  prop: string
  rowIndex: number
  rules?: any
  options?: any[]
  optionKey?: string
  valueKey?: string
  labelKey?: string
  events?: any
  apiProps?: any
  isApiProps?: (row: any) => any
  props?: any
  isProps?: (row: any) => any
  isDisabled?: (row: any) => boolean
}
const {
  type,
  prop,
  rowIndex,
  events,
  props,
  options: opts,
  optionKey,
  valueKey = 'value',
  labelKey = 'label',
  apiProps,
  isApiProps,
  isProps,
  isDisabled
} = defineProps<Props>()

const emit = defineEmits<{
  'cell-change': [prop: string, opt?: any]
}>()

const modelRow = defineModel<any>('row')

const formDisabled = useFormDisabled()
const parentFormItem = useFormItem()

const change = (opt?: any) => {
  emit('cell-change', prop, { value: modelValue.value, row: modelRow.value, rowIndex })
  events?.change?.({ ...opt, row: modelRow.value, rowIndex })
}

const bindEvents = {
  ...events,
  visibleChange: (v: boolean) => {
    nextTick(() => {
      visible.value = v
      events?.visibleChange?.(v)
    })
  },
  change
}

const bindProps = computed(() => ({
  ...props,
  ...isProps?.(modelRow.value)
}))

const focusOptions = ref<any[]>([])
const bindApiProps = computed(() => ({
  ...apiProps,
  ...isApiProps?.(modelRow.value),
  cb: (data: any) => {
    focusOptions.value = data
  }
}))

const options = computed(
  () =>
    (focusOptions.value?.length ? focusOptions.value : optionKey ? modelRow.value[optionKey] : opts)
      ?.map((m: any) => ({
        ...m,
        value: m[valueKey],
        label: m[labelKey]
      }))
      ?.filter((m: any) => !isEmpty(m.value)) ??
    bindApiProps.value?.cacheData ??
    []
)

const cellDisabled = computed(
  () => formDisabled.value || isDisabled?.(modelRow.value) || props?.disabled || isProps?.(modelRow.value)?.disabled
)
const modelValue = computed({
  get: () => modelRow.value[prop],
  set(val) {
    modelRow.value[prop] = val
  }
})

const isVisible = ['el-select', 'el-select-v2', 'date'].includes(type)

const visible = ref(false)

const clear = () => {
  modelValue.value = undefined
  change()
}
const mouseenter = () => {
  if (cellDisabled.value) return
  visible.value = true
}

const isEmpty = (val: string | null | undefined) =>
  [undefined, null, ''].includes(val) || (Array.isArray(val) && !val.length)

const getLabel = (val: any, list: any[]): any => {
  if (!val || !list?.length) return
  const item = list?.find((m: any) => m.value === val)
  if (item) return item?.label
  for (const opt of list) {
    const label = getLabel(val, opt.children)
    if (label) return label
  }
}
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
          {{ getLabel(value, options) ?? value }}
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
      v-model:form="modelRow"
      :type="type"
      :prop="prop"
      :disabled="isDisabled?.(modelRow)"
      :props="bindProps"
      :api-props="bindApiProps"
      :events="bindEvents"
      :options="options"
      :value-key="valueKey"
      :label-key="labelKey"
      v-bind="$attrs"
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
    line-height: 30px;
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
