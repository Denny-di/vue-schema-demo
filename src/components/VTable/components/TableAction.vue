<script setup lang="ts" name="TableAction">
interface Props {
  actionOptions?: ActionOptionType[]
  commonParams?: any
}
const { actionOptions = [], commonParams = {} } = defineProps<Props>()

const emit = defineEmits(['change', 'action-change'])

const uploadDialogRef = ref()

const loadingMap = reactive<Record<string, boolean>>({})

const handle = async (item: ActionOptionType) => {
  const { prop, apiProps, beforeOpen } = item
  try {
    // switch (prop) {
    //   case 'import':
    //     if (beforeOpen) await beforeOpen()
    //     uploadDialogRef.value!.open(apiProps)
    //     break

    //   case 'export': {
    //     await message.exportConfirm()
    //     loadingMap[prop] = true
    //     const { api, fileName, apiParams = {} } = apiProps ?? {}
    //     const data = await api({ ...apiParams, ...commonParams })
    //     if (data) {
    //       download.excel(data, `${fileName}.xlsx`)
    //     }
    //     loadingMap[prop] = false
    //     break
    //   }
    // }
    emit('action-change', prop, item)
  } catch (error) {
    console.error(error)
  } finally {
    loadingMap[prop] = false
  }
}

const success = () => {
  emit('change')
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

  <!-- <UploadDialog ref="uploadDialogRef" @success="success" /> -->
</template>

<style scoped lang="scss"></style>
