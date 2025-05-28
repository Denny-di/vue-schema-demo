<script setup lang="ts" name="VFormDialog">
type ApiType = (params?: any) => Promise<any>
interface BtnType {
  label: string
  api?: ApiType
  [x: string]: any
}

interface Props {
  title?: string
  width?: number | string
  loading?: boolean
  disabled?: boolean
  okText?: string
  cancelText?: string
  dialogProps?: any
  isDetail?: boolean
  submitBtns?: BtnType[]
  apiParams?: any
  minHeight?: number
  api?: ApiType
  beforeSubmit?: (params?: any, type?: string) => Promise<any>
}

const { apiParams, width = 1400, okText = '确定', cancelText = '取消', beforeSubmit } = defineProps<Props>()

const emit = defineEmits(['close', 'success', 'change'])

const change = (...args: any[]) => emit('change', ...args)

const visible = defineModel<boolean>('visible', { default: false })

const slots = defineSlots()
const slotsName = Object.keys(slots)

const VFormRef = ref()
const submitLoading = ref(false)

const submit = async (api?: ApiType, submitType?: string) => {
  try {
    const params = { ...apiParams }
    if (beforeSubmit) await beforeSubmit(params, submitType)
    const valid = await validate()
    if (!valid) return
    submitLoading.value = true
    await api?.(params)
    ElMessage.success('提交成功')
    emit('success')
    close()
  } catch (err: any) {
    console.log('err =>', err)
    ElMessage.error('提交信息不完整，请检查后再提交')
  } finally {
    submitLoading.value = false
  }
}

const resetFields = () => VFormRef.value?.resetFields()
const validate = async () => await VFormRef.value?.validate()
const validateField = async (props: string[]) => await VFormRef.value?.validateField(props)
const clearValidate = async (props?: string[]) => await VFormRef.value?.clearValidate(props)

const close = () => {
  resetFields()
  visible.value = false
  submitLoading.value = false
  emit('close')
}

defineExpose({
  close,
  validate,
  resetFields,
  clearValidate,
  validateField
})
</script>

<template>
  <el-dialog v-model="visible" :width="width" draggable overflow v-bind="dialogProps" @close="close">
    <template #header>
      <slot name="header">{{ title }}</slot>
    </template>
    <div v-loading="loading || submitLoading" :style="minHeight ? `min-height: ${minHeight}px` : ''">
      <slot v-if="$slots?.header" name="header"></slot>
      <slot name="content">
        <VFormPanel v-if="isDetail" v-bind="$attrs">
          <template v-for="slotName in slotsName" :key="slotName" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps"></slot>
          </template>
        </VFormPanel>
        <VForm v-else ref="VFormRef" :disabled="disabled" v-bind="$attrs" @change="change">
          <template v-for="slotName in slotsName" :key="slotName" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps"></slot>
          </template>
        </VForm>
      </slot>
    </div>
    <template v-if="!isDetail" #footer>
      <slot name="footer-left"></slot>
      <el-button @click="close">{{ cancelText }}</el-button>

      <el-button
        v-for="btn in submitBtns"
        :key="btn.label"
        :type="btn.type"
        :disabled="submitLoading || disabled"
        :loading="submitLoading"
        @click="submit(btn.api, btn.value)"
      >
        {{ btn.label }}
      </el-button>

      <el-button type="primary" :disabled="submitLoading || disabled" :loading="submitLoading" @click="submit(api)">
        {{ okText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss"></style>
