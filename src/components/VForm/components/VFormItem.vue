<script setup lang="ts" name="VFormItem">
import { isEqual } from 'lodash-es'
interface Props {
  type?: FormComponentType
  prop?: string
  events?: any
  props?: any
  extraProps?: string[]
  apiProps?: any
  appendProps?: any
  models?: ModelType[]
  modelName?: string
  options?: any[]
  valueKey?: string
  labelKey?: string
  disabled?: boolean
  disableModel?: boolean
  content?: string
}

type CmponentsType = {
  [K in FormComponentType]?: any
}

const {
  prop,
  models,
  type = 'text',
  events = {},
  props,
  extraProps,
  apiProps,
  modelName,
  options: opts,
  valueKey = 'value',
  labelKey = 'label',
  disabled,
  disableModel
} = defineProps<Props>()

const emit = defineEmits(['change'])

const slots = defineSlots()
const slotsName = Object.keys(slots)

const model = defineModel<any>({
  set: (value) => (disableModel ? model.value : value)
})

const form = defineModel<any>('form')

const modelKey = computed(() => modelName ?? 'modelValue')

const focusOptions = ref<any[]>([])
const loading = ref(false)
const cacheParams = ref<any>()
const focus = async () => {
  try {
    const { api, apiParams, cb } = apiProps ?? {}
    if (!api || isEqual(cacheParams.value, apiParams)) return
    cacheParams.value = apiParams
    loading.value = true
    const data = await api(apiParams, prop)
    focusOptions.value = data ?? []
    cb?.(data)
  } catch (error) {
    console.error(error)
    focusOptions.value = []
    cacheParams.value = undefined
  } finally {
    loading.value = false
    events?.focus?.(focusOptions.value)
  }
}

const options = computed(
  () =>
    (focusOptions.value?.length ? focusOptions.value : opts)
      ?.map((m: any) => ({
        ...m,
        value: m[valueKey],
        label: m[labelKey]
      }))
      ?.filter((m: any) => !isEmpty(m.value)) ??
    apiProps?.cacheData ??
    []
)

const formatMap: CmponentsType = {
  date: 'YYYY-MM-DD',
  daterange: 'YYYY-MM-DD'
}

const setValue = (value: any) => {
  const format = formatMap[type]
  let val = value
  if (type === 'date') val = val && dayjs(val).format(format)
  else if (type === 'daterange') val = val?.map((m: any) => dayjs(m).format(format))
  if (!isEqual(val, model.value)) model.value = val
  return val
}

const modelValue = computed({
  get: () => setValue(model.value),
  set: (val) => {
    model.value = val

    if (form.value && extraProps?.length) {
      if (bindProps.value?.multiple) {
        const opts = options.value?.filter((m: any) => val.includes(m.value))
        for (const item of extraProps) {
          const [field, key] = item.split('-')
          form.value[field] = Array.from(new Set(opts?.map((m: any) => m[key ?? field])))
        }
      } else {
        const opt = options.value?.find((m: any) => m.value === val)
        for (const item of extraProps) {
          const [field, key] = item.split('-')
          form.value[field] = opt?.[key ?? field]
        }
      }
    }
  }
})

const componentMap: CmponentsType = {
  textarea: 'el-input',
  date: 'el-date-picker',
  daterange: 'el-date-picker'
}

const propsMap: CmponentsType = {
  'el-select': {
    placeholder: '请选择',
    clearable: true,
    filterable: true,
    collapseTags: true,
    collapseTagsTooltip: true
  },
  'el-select-v2': {
    placeholder: '请选择',
    clearable: true,
    filterable: true,
    collapseTags: true,
    collapseTagsTooltip: true
  },
  'el-cascader': {
    placeholder: '请选择',
    clearable: true,
    filterable: true,
    collapseTags: true,
    showAllLevels: false,
    collapseTagsTooltip: true
  },
  'el-tree-select': {
    placeholder: '请选择',
    clearable: true,
    filterable: true,
    checkStrictly: true,
    defaultExpandAll: true,
    renderAfterExpand: false
  },
  'el-input': { placeholder: '请输入', clearable: true, maxlength: 255 },
  'el-input-number': {
    placeholder: '请输入',
    min: 0,
    max: 999999999,
    precision: 0,
    controlsPosition: 'right'
  },
  'textarea': { placeholder: '请输入', type: 'textarea', maxlength: 255, rows: 3 },
  'date': { placeholder: '请选择', type: 'date', valueFormat: 'YYYY-MM-DD', clearable: true },
  'daterange': {
    type: 'daterange',
    shortcuts,
    rangeSeparator: '-',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    valueFormat: 'YYYY-MM-DD'
  }
}

const cellChange = (prop?: string, opt: any = {}) => {
  if (prop === 'delete') {
    const { rowIndex } = opt
    model.value.splice(rowIndex, 1)
  }
  emit('change', prop, opt)
}

const change = (value: any) => {
  emit('change', prop, { value })
  events?.change?.({
    prop,
    value,
    options: options.value,
    current: options.value?.find((f: any) => f.value === value)
  })
}

const bindEvents = computed(() => ({
  ...events,
  change,
  focus
}))

const bindProps = computed(() => {
  const p = {
    disabled,
    loading: loading.value,
    ...propsMap[type],
    ...bindModels(models, modelValue),
    ...props
  }
  if (['el-select-v2', 'el-cascader'].includes(type)) {
    p.options = options.value ?? []
  } else if (['el-tree-select'].includes(type)) {
    p.data = options.value ?? []
  }

  if (type === 'el-cascader' && !p.props?.emitPath) {
    if (p.props) p.props.emitPath = false
    else p.props = { multiple: p.multiple, emitPath: false }
  }
  if (p.max && p.max < 0) p.max = 999999999
  return p
})

const isEmpty = (val: string | null | undefined) => [undefined, null, ''].includes(val)
</script>

<template>
  <div class="v-form-item w-full flex items-center">
    <component
      :is="componentMap[type] ?? type"
      v-if="['el-radio-group', 'el-checkbox-group', 'el-select'].includes(type)"
      v-model="modelValue"
      class="w-full"
      v-bind="bindProps"
      v-on="bindEvents"
    >
      <template v-if="type === 'el-radio-group'">
        <template v-for="opt in options" :key="opt.label">
          <el-radio v-if="!isEmpty(opt.value)" v-bind="opt" :label="opt.value">
            {{ opt.label }}
          </el-radio>
        </template>
      </template>

      <template v-else-if="type === 'el-checkbox-group'">
        <template v-for="opt in options" :key="opt.label">
          <el-checkbox v-if="!isEmpty(opt.value)" v-bind="opt" :label="opt.value">
            {{ opt.label }}
          </el-checkbox>
        </template>
      </template>

      <template v-else-if="type === 'el-select'">
        <template v-for="opt in options" :key="opt.label">
          <el-option v-if="!isEmpty(opt.value)" v-bind="opt" />
        </template>
      </template>
    </component>

    <VTable
      v-else-if="type === 'table'"
      :data="modelValue"
      :enabled-sort="false"
      :hide-empty="!!appendProps"
      simple
      hide-pagination
      v-bind="bindProps"
      @cell-change="cellChange"
    >
      <template v-if="appendProps" #append>
        <slot name="append-slot"></slot>
      </template>

      <!-- 自定义插槽 -->
      <template v-for="slotName in slotsName" :key="slotName" #[slotName]="scope">
        <slot :name="slotName" :prop="prop" v-bind="scope"></slot>
      </template>
    </VTable>
    <div v-else-if="type === 'content'" v-bind="bindProps">{{ content ?? '-' }}</div>
    <span v-else-if="type === 'text'" class="truncate" :title="modelValue">{{ modelValue ?? '-' }}</span>
    <template v-else-if="type === 'options'">
      {{ options?.find((m: any) => m.value === modelValue)?.label }}
    </template>

    <component
      :is="componentMap[type] ?? type"
      v-else
      v-model:[modelKey]="modelValue"
      class="w-full"
      v-bind="bindProps"
      v-on="bindEvents"
    >
      <template v-for="slotName in slotsName" :key="slotName" #[slotName]="scope">
        <slot :name="slotName" v-bind="scope"></slot>
      </template>
    </component>
  </div>
</template>

<style lang="scss" scoped>
.v-form-item {
  ::v-deep() {
    .el-date-editor,
    .el-input-number,
    .el-select,
    .el-select-v2,
    .el-input {
      width: 100%;
      box-sizing: border-box;
    }
    .el-select__tags-text {
      max-width: 48px;
    }
    .el-input__inner {
      text-align: left;
    }

    .el-select-v2 {
      .el-select-v2__selection {
        flex-wrap: nowrap;
        .el-select-v2__selected-item {
          flex-shrink: 0;
          > input {
            max-width: 60px;
          }
        }
        .el-tag {
          padding: 0 4px;
          height: 24px;
          .el-select-v2__tags-text {
            max-width: 50px;
          }
          .el-tag__close {
            display: none;
          }
        }
      }
    }
  }
}
</style>
