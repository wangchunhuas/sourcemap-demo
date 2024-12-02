<template>
  <div>性能测试</div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const num = null;
  if (num.length > 1) {
    console.log("发生了错误");
  }
});
</script>
<style scoped></style>