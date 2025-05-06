<script setup lang="ts" name="TableAction">
interface Props {
  actionOptions?: ActionOptionType[]
}
const { actionOptions = [] } = defineProps<Props>()

const emit = defineEmits(['change', 'action-change'])

const loadingMap = reactive<Record<string, boolean>>({})

const handle = async (item: ActionOptionType) => {
  const { prop } = item
  try {
    emit('action-change', prop, item)
  } catch (error) {
    console.error(error)
  } finally {
    loadingMap[prop] = false
  }
}
</script>

<template>
  <div class="table-action">
    <template v-for="item in actionOptions" :key="item.prop">
      <el-button
        v-if="!item.hidden"
        type="primary"
        :loading="loadingMap[item.prop]"
        :icon="item.icon"
        v-bind="item.props"
        @click="handle(item)"
      >
        {{ item.label }}
      </el-button>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
