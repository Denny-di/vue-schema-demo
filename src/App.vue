<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-tabs model-value="0" class="demo-tabs">
      <el-tab-pane label="Table">
        <TableDemo />
      </el-tab-pane>
      <el-tab-pane label="Test"> </el-tab-pane>
    </el-tabs>
  </el-config-provider>
</template>

<style scoped></style>
