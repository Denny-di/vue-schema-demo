interface PaginationType {
  pageNo: number
  pageSize: number
}

type AsyncBeforeRequestHook = (params: any) => Promise<boolean | void>
interface OptType {
  api?: any | ComputedRef<any>
  apiParams?: any | ComputedRef<any>
  pageSize?: number
  closeDefaultRequest?: boolean
  beforeRequest?: AsyncBeforeRequestHook
  afterRequest?: (rows: any) => void
}

/**
 * 分页列表
 * @param api 接口
 * @param apiParams 参数
 * @param beforeRequest 接口请求前的钩子，返回false则不请求
 * @returns
 */
export default function useList(opt: OptType) {
  const { api, apiParams, pageSize = 20, closeDefaultRequest, beforeRequest, afterRequest } = opt

  const list = ref<any[]>([])
  const loading = ref(false)
  const total = ref(0)
  const pagination = reactive<PaginationType>({ pageNo: 1, pageSize })

  const getList = async () =>
    await nextTick(async () => {
      try {
        list.value = []
        if (!api || !unref(api)) return
        const params = unref(apiParams)
        console.log('getList apiParams=>', params)
        if (beforeRequest) {
          const res = await beforeRequest(params)
          if (!res) return
        }

        loading.value = true
        const res = await unref(api)(params)
        if (Array.isArray(res)) {
          list.value = res
        } else {
          list.value = res.list ?? []
          total.value = res.total ?? 0
          if (afterRequest) afterRequest(list.value)
        }
      } catch (error) {
        console.error('Failed to fetch list:', error)
      } finally {
        loading.value = false
      }
    })

  const clearList = () => {
    list.value = []
    total.value = 0
    pagination.pageNo = 1
  }

  onMounted(() => {
    if (!closeDefaultRequest) getList()
  })

  return {
    list,
    loading,
    total,
    pagination,
    getList,
    clearList
  }
}
