<template>
  <div class="about">
    <p @click="triggerTypeError">触发TypeError</p>
    <p @click="triggerReferenceError">触发ReferenceError</p>
    <p @click="triggerSyntaxError">触发SyntaxError</p>
  </div>
</template>
<script setup>
const triggerTypeError = () => {
  if (TypeError.length > 0) {
    console.log("err");
  }
};
const triggerReferenceError = () => {
  throw new ReferenceError("kkkk");
};
const triggerSyntaxError = () => {
  throw new SyntaxError("kkkk");
};
</script>
<style scoped></style>