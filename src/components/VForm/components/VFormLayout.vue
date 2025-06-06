<script setup lang="ts" name="VFormLayout">
import VFormItem from './VFormItem.vue'

interface Props {
  schema?: SchemaType[]
  gutter?: number
  colSpan?: number
}

const { schema, gutter = 20, colSpan = 3 } = defineProps<Props>()

const emit = defineEmits(['change'])

const slots = defineSlots()
const slotsName = Object.keys(slots).filter((name) => name !== 'default')

const model = defineModel<any>('model')

const defaultSpan = (type?: string) => (type && ['el-divider', 'el-tabs', 'table'].includes(type) ? 24 : 24 / colSpan)

const change = (...args: any[]) => emit('change', ...args)
</script>

<template>
  <el-row class="!ml-0 !mr-0" :gutter="gutter">
    <template v-for="item in schema" :key="item.prop">
      <el-col v-if="!item.hidden" class="!pr-0 !pl-0" :span="item.span ?? defaultSpan(item.type)">
        <el-tabs v-if="item.type === 'el-tabs'" :model-value="'0'" v-bind="item.props" class="flex-1 overflow-hidden">
          <template v-for="tab in item.options" :key="tab.label">
            <el-tab-pane v-if="!tab.hidden" :label="tab.label" v-bind="tab.props">
              <VFormLayout
                v-if="tab.children?.length"
                v-model:model="model"
                :schema="tab.children"
                :gutter="gutter"
                :col-span="colSpan"
                v-bind="$attrs"
                @change="change"
              >
                <template v-for="slotName in slotsName" :key="slotName" #[slotName]="slotProps">
                  <slot :name="slotName" v-bind="slotProps"></slot>
                </template>
              </VFormLayout>
            </el-tab-pane>
          </template>
        </el-tabs>

        <el-form-item v-else class="w-full mr-0" :label="item.label" :prop="item.prop" v-bind="item.itemProps">
          <slot v-if="slotsName.includes(item.prop)" :name="item.prop" v-bind="item"> </slot>
          <VFormItem v-else v-model="model[item.prop]" v-model:form="model" v-bind="item" @change="change">
            <template v-for="slotName in slotsName" :key="slotName" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps"></slot>
            </template>
          </VFormItem>
        </el-form-item>
      </el-col>
    </template>
    <slot></slot>
  </el-row>
</template>

<style scoped lang="scss"></style>
