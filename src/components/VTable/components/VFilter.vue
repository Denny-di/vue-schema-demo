<script setup lang="ts" name="VFilter">
interface Props {
  type: FormComponentType
  props?: any
  label?: string
  models?: ModelType[]
  multiple?: boolean
  className?: string
  width?: number | string
  options?: Array<{
    label: string
    value: string | number | boolean
  }>
}

const { type, props, label, models = [], multiple } = defineProps<Props>()

const emit = defineEmits(['change'])

const modelValue = defineModel()
const form = defineModel('form')

const change = (prop?: string, opt: any = {}) => {
  emit('change', { prop, ...opt, oldValue: modelValue.value })
}

const bindProps = computed(() => ({
  multiple,
  placeholder: label,
  props: type === 'el-cascader' ? { multiple, emitPath: false } : undefined,
  ...bindModels(models, modelValue),
  ...props
}))
</script>

<template>
  <div class="v-filter" :class="{ [`v-filter--${type}`]: !!type }" :style="width ? `width: ${width}px` : ''">
    <VFormItem
      v-model="modelValue"
      v-model:form="form"
      :type="type"
      :props="bindProps"
      :class="className"
      :options="options"
      v-bind="$attrs"
      @change="change"
    />
  </div>
</template>

<style scoped lang="scss">
:global(.cascade-select + .el-form-item .v-filter) {
  width: 240px;
}

.v-filter {
  width: 200px;
  &--date {
    width: 240px;
  }
}
</style>
