<script setup lang="ts" name="OperateCell">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

interface Props {
  row?: any
  rowIndex?: number
  options?: OperateOptionType[]
  hideProp?: string
}
const emit = defineEmits<{
  'table-change': [prop: string, opt?: any]
  'cell-change': [prop: string, opt?: any]
}>()

const { row, rowIndex, options, hideProp } = defineProps<Props>()

const filterList = computed<OperateOptionType[]>(
  () =>
    options?.filter(
      (f) => !f.hidden && !f.isHidden?.(row) && (!f.showValues || f.showValues?.includes(row[hideProp as string]))
    ) ?? []
)

const list = computed<OperateOptionType[]>(() => filterList.value?.filter((f) => !f.unfold) ?? [])

const handle = async (item: OperateOptionType) => {
  try {
    const { prop, label, type, reconfirm } = item
    let cb: any = null
    if (reconfirm || (type === 'danger' && reconfirm !== false)) {
      await ElMessageBox.confirm(`确认是否${label}？`)
      cb = () => {
        ElMessage.success(`${label}成功`)
        emit('table-change', 'init')
      }
    }
    emit('cell-change', prop, { row, rows: [row], cb, rowIndex })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="operate-cell">
    <div class="unfold-wrap">
      <template v-for="item in filterList" :key="item.prop">
        <el-button
          v-if="item.unfold"
          :type="item.type ?? 'primary'"
          :disabled="item.disabled"
          :icon="item.icon"
          link
          plain
          @click="handle(item)"
        >
          {{ item.label }}
        </el-button>
      </template>
    </div>

    <el-dropdown v-if="list?.length" trigger="hover">
      <el-button type="primary" link plain>
        操作
        <el-icon><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="item in list" :key="item.prop">
            <el-dropdown-item>
              <el-button
                :type="item.type ?? 'primary'"
                :disabled="item.disabled"
                :icon="item.icon"
                link
                plain
                @click="handle(item)"
              >
                {{ item.label }}
              </el-button>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.operate-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  .unfold-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    .el-button {
      margin-left: 0;
    }
    .el-button.is-disabled {
      &.el-button--danger {
        color: var(--el-color-danger-light-5) !important;
      }
    }
  }
}
</style>
