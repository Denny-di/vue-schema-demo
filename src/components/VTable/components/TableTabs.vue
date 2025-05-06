<script setup lang="ts" name="TableTabs">
interface Props {
  prop?: string
  defaultValue?: number | string
  options?: Array<VTableType & { label: string; value?: number | string }>
}

const { prop, options = [], defaultValue } = defineProps<Props>()

const emit = defineEmits<{
  change: [opt?: ChangeOptType]
}>()

const modelValue = ref(defaultValue ?? options?.[0]?.value)

const handle = () => {
  const val = modelValue.value
  modelValue.value = undefined
  nextTick(() => {
    console.log('TableTabs change =>', val)
    modelValue.value = val
    emit('change', { [prop ? prop : 'value']: val })
  })
}

defineExpose({
  modelValue,
  filterParams: computed(() => (prop ? { [prop]: modelValue.value !== '0' ? modelValue.value : undefined } : {}))
})
</script>

<template>
  <el-tabs v-model="modelValue" class="table-tabs" @tab-change="handle">
    <el-tab-pane v-for="tab in options" :key="tab.value" :label="tab.label" :name="tab.value" />
  </el-tabs>
</template>

<style scoped lang="scss"></style>
