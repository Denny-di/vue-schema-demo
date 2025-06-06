<script setup lang="ts" name="VForm">
interface Props {
  labelWidth?: number | string
  disabled?: boolean
}

const { labelWidth = 120 } = defineProps<Props>()

const emit = defineEmits(['change'])

const slots = defineSlots()
const slotsName = Object.keys(slots).filter((name) => name !== 'default')

const model = defineModel<any>('model')

const change = (...args: any[]) => emit('change', ...args)

const formRef = ref()
const validate = async () => {
  console.log('validate form =>', model.value)
  return await formRef.value?.validate()
}
const resetFields = () => formRef.value?.resetFields()
const validateField = async (props: string[]) => await formRef.value?.validateField(props)
const clearValidate = async (props?: string[]) => await formRef.value?.clearValidate(props)

let timer: any
onMounted(() => {
  nextTick(() => {
    timer = setTimeout(() => {
      clearTimeout(timer)
      clearValidate()
    })
  })
})

onUnmounted(() => {
  clearTimeout(timer)
})

defineExpose({
  validate,
  resetFields,
  validateField,
  clearValidate
})
</script>

<template>
  <el-form
    ref="formRef"
    class="v-form"
    v-bind="$attrs"
    :model="model"
    :disabled="disabled"
    :inline="true"
    :label-width="labelWidth"
    label-suffix="："
  >
    <VFormLayout v-model:model="model" v-bind="$attrs" @change="change">
      <template v-for="slotName in slotsName" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps"></slot>
      </template>
    </VFormLayout>
    <slot></slot>
  </el-form>
</template>

<style scoped lang="scss">
.v-form {
  ::v-deep() {
    .el-form-item {
      margin-right: 0;
      width: 100%;
      .el-form-item__label {
        padding-right: 0;
        white-space: nowrap;
      }
      .el-input {
        width: 100%;
      }
      .el-input-number {
        width: 100%;
        .el-input__inner {
          text-align: left;
        }
      }
      .el-slider {
        margin-left: 10px;
      }
    }
  }
}
</style>
