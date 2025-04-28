<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const checkList = ref()
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary">Primary</el-button>
  <el-checkbox-group v-model="checkList">
    <!-- works when >=2.6.0, recommended ✔️ value not work when <2.6.0 ❌ -->
    <el-checkbox label="Option 1" value="Value 1" />
    <!-- works when <2.6.0, deprecated act as value when >=3.0.0 -->
    <el-checkbox label="Option 2 & Value 2" />
  </el-checkbox-group>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
