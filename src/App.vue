<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const active = ref(location.hash.replace('#', '') || 'Table')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-tabs v-model="active" class="demo-tabs">
      <el-tab-pane label="Table" name="Table">
        <TableDemo />
      </el-tab-pane>
      <el-tab-pane label="Form" name="Form">
        <FormDemo />
      </el-tab-pane>
    </el-tabs>
  </el-config-provider>
</template>

<style scoped></style>
