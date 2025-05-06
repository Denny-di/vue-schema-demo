interface OptType {
  code?: string
  columns: ColumnType[]
  hideProps?: string[]
  cellWidth?: number | string
  minCellWidth: number | string
}

const getTextWidth = (text: string) => {
  let width = 0
  for (const char of text) {
    const code = char.charCodeAt(0)
    if (code > 255) width += 14
    else width += 10
  }
  return width
}

export default function useColumns(opt: ComputedRef<OptType>) {
  const filterColumns = computed(() =>
    unref(opt).columns.filter((f) => !f.hidden && !unref(opt).hideProps?.includes(f.prop))
  )

  // --------------- 列配置 -------------------
  const whiteList = ['operate']
  const tableColumns = computed(() => filterColumns.value.filter((f) => !whiteList.includes(f.prop)))
  const cacheColumns = ref<string[]>([])
  const updateCacheColumns = () => {
    cacheColumns.value = localStorage.getItem(unref(opt).code ?? '')?.split(',') ?? []
  }

  watch(() => unref(opt).code, updateCacheColumns, { immediate: true })
  // --------------- 列配置 end -------------------

  const columnList = computed(() => {
    const list = cacheColumns.value?.length
      ? filterColumns.value.filter((f) => whiteList.includes(f.prop) || cacheColumns.value.includes(f.label))
      : filterColumns.value

    const cellWidth = unref(opt).cellWidth
    const minCellWidth = +unref(opt).minCellWidth
    return list
      .map((m, index) => {
        const w = getTextWidth(m.label) + 30
        const minCellW = w > minCellWidth ? w : minCellWidth
        return {
          ...m,
          sort: m.sort ?? index + 1,
          width: m.width ?? cellWidth,
          minWidth: !m.width ? (m.minWidth ?? minCellW) : undefined
        }
      })
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
  })

  return {
    tableColumns,
    columnList,
    updateCacheColumns
  }
}
