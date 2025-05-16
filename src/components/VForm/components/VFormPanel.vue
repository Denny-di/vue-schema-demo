<script setup lang="ts" name="VFormPanel">
import dayjs from 'dayjs'

interface Props {
  model?: any
  panel?: PanelType[]
  gutter?: number
  colSpan?: number
}

const { gutter = 20, colSpan = 3 } = defineProps<Props>()

const defaultSpan = (type?: string) => (type && ['divider', 'tab', 'table'].includes(type) ? 24 : 24 / colSpan)
</script>

<template>
  <div class="v-form-panel">
    <slot></slot>

    <el-row class="!ml-0 !mr-0" :gutter="gutter">
      <template v-for="item in panel" :key="item.prop">
        <template v-if="!item.hidden">
          <el-col class="!flex gap-1 mb-8" :span="item.span ?? defaultSpan(item.type)">
            <span v-if="item.label" class="flex-shrink-0">{{ item.label }}：</span>

            <div v-if="item.type === 'content'">{{ item.content }}</div>
            <el-divider v-else-if="item.type === 'divider'" v-bind="item.props" />
            <el-tabs
              v-else-if="item.type === 'tab'"
              :model-value="'0'"
              v-bind="item.props"
              class="flex-1 overflow-hidden"
            >
              <template v-for="tab in item.options" :key="tab.label">
                <el-tab-pane v-if="!tab.hidden" :label="tab.label" v-bind="tab.props">
                  <VFormPanel
                    v-if="tab.children?.length"
                    :model="tab.model ?? model"
                    :panel="tab.children"
                    :gutter="gutter"
                    :col-span="colSpan"
                    v-bind="$attrs"
                  />
                </el-tab-pane>
              </template>
            </el-tabs>
            <VTable
              v-else-if="item.type === 'table'"
              size="auto"
              hide-pagination
              :data="item.prop ? model[item.prop] : undefined"
              :enabled-sort="false"
              :show-summary="!!item?.props?.summaryProps"
              v-bind="item.props"
              class="flex-1 overflow-hidden"
            />
            <span v-else-if="item.prop && model[item.prop]">
              <template v-if="item.type === 'date'">
                {{ dayjs(model[item.prop]).format('YYYY-MM-DD') }}
              </template>
              <template v-else-if="item.type === 'options'">
                {{ item.options?.find((m) => m.value === model[item.prop as string])?.label }}
              </template>
              <template v-else> {{ model[item.prop] }} </template>
            </span>
            <template v-else>-</template>
          </el-col>
        </template>
      </template>
      <slot></slot>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
