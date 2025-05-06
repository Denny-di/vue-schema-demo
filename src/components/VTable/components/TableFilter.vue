<script setup lang="ts" name="TableFilter">
// 生成UUID
const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
interface Props {
  filterOptions?: FilterOptionType[]
}

const { filterOptions = [] } = defineProps<Props>()

const emit = defineEmits(['change'])

const filterTeleportRef = ref()
provide('filterTeleportRef', filterTeleportRef)

const form = reactive<any>({})

const filterList = ref<FilterOptionType[]>([])

watchEffect(() => {
  filterList.value = filterOptions.filter((f) => !f.hidden)

  for (const item of filterList.value) {
    if (!item.prop) item.prop = `uuid__${generateUUID()}`

    if (
      item.defaultValue !== undefined &&
      (form[item.prop] === undefined || (item.prop?.includes('uuid__') && !form[item.prop]))
    ) {
      form[item.prop] = item.defaultValue
    }

    if (item.childType) {
      const opt = item.options?.find((f: any) => item.prop && f.value === form[item.prop])
      const child = opt?.child ?? { type: item.childType }
      item.child = { ...child, prop: form[item.prop], label: opt?.label }
    }
  }
})

const formRef = ref()

const change = (item?: Partial<FilterOptionType>, value?: any) => {
  const { prop, child, clearFields } = item ?? {}

  console.log('TableFilter change => ', prop, value, form)
  if (clearFields?.length) {
    for (const key of clearFields) {
      form[key] = null
    }
  }
  const key = child?.prop
  if (key) {
    if (!form[key] || !form[key]?.length) return
    form[key] = undefined
  }
  emit('change', prop ? { [prop]: value, prop, value } : undefined)
}

const clear = () => {
  for (const key in form) {
    form[key] = null
  }
}

const reset = () => {
  clear()
  change()
}

const filterParams = computed(() => {
  const params: any = {}
  for (const key in form) {
    if (key.includes('uuid__')) continue

    if (form[key]?.length && key.includes('-')) {
      const keys = key.split('-')
      for (let i = 0; i < keys.length; i++) {
        params[keys[i]] = form[key][i]
      }
    } else {
      params[key] = form[key]
    }
  }
  return params
})

defineExpose({
  filterParams,
  clear,
  reset
})
</script>

<template>
  <div class="table-filter">
    <el-form ref="formRef" :model="form" :inline="true">
      <template v-for="item in filterList" :key="item.prop">
        <div class="flex items-center">
          <el-form-item v-if="item.prop" :prop="item.prop" :class="{ 'cascade-select': item.child }">
            <VFilter
              v-model="form[item.prop]"
              :props="{ clearable: !item.child }"
              :width="item.child ? 130 : undefined"
              v-bind="item"
              @change="change(item, $event)"
            />
          </el-form-item>

          <el-form-item v-if="item.child?.prop">
            <VFilter v-model="form[item.child.prop]" v-bind="item.child" @change="change(item.child, $event)" />
          </el-form-item>
        </div>
      </template>

      <div class="flex items-center">
        <el-button type="primary" @click="change()"> 查询 </el-button>
        <el-button @click="reset"> 重置 </el-button>
      </div>
    </el-form>

    <div ref="filterTeleportRef"></div>
  </div>
</template>

<style scoped lang="scss">
.table-filter {
  margin-bottom: 4px;

  .el-form {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    .el-form-item {
      margin: 0;
    }

    .cascade-select {
      margin-right: -2px;
      ::v-deep() {
        .el-select__wrapper {
          border-right: 0;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .el-select .is-focused {
          z-index: 9;
        }
      }
      & + .el-form-item {
        ::v-deep() {
          .el-input__wrapper,
          .el-select__wrapper,
          .el-select-v2__wrapper,
          .el-date-editor--daterange {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    }
  }
}
</style>
