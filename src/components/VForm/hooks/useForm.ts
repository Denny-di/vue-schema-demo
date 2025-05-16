interface OptType {
  emit?: any
}

type ApiType = (params?: any) => Promise<any>

export default function useForm(opt?: OptType) {
  const { emit } = opt ?? {}
  const form = ref<any>({})
  const formRef = ref()
  const visible = ref(false)
  const loading = ref(false)
  const isFinished = ref(false)

  const formType = ref<string>('')

  const isAdd = computed(() => !['edit', 'detail'].some((type) => formType.value?.includes(type)))
  const isEdit = computed(() => formType.value?.includes('edit'))
  const isDetail = computed(() => formType.value?.includes('detail'))

  const success = async () => emit?.('refresh')

  const validate = async () => await formRef.value?.validate()

  const reset = () => {
    loading.value = false
    isFinished.value = false
    formType.value = ''
    form.value = {}
  }

  const close = () => {
    reset()
    visible.value = false
  }

  const submit = async (api?: ApiType, params?: any) => {
    try {
      const valid = await validate()
      if (!valid) return
      loading.value = true
      await api?.(params)
      ElMessage.success('提交成功')
      emit?.('success')
      close()
    } catch (err: any) {
      console.log('err =>', err)
      ElMessage.error('提交信息不完整，请检查后再提交')
      throw err
    } finally {
      loading.value = false
    }
  }

  const getDetail = async (api: any, params?: any, bool?: boolean) => {
    loading.value = true
    isFinished.value = false
    try {
      const data = await api(params)
      if (!bool) {
        form.value = {
          ...form.value,
          ...data
        }
      }
      console.log('getDetail =>', form.value)
      return data
    } catch (e) {
      console.error(e)
    } finally {
      loading.value = false
      isFinished.value = true
    }
  }

  return {
    form,
    formRef,
    visible,
    loading,
    formType,
    isAdd,
    isEdit,
    isDetail,
    isFinished,
    validate,
    submit,
    reset,
    close,
    success,
    getDetail
  }
}
