<template>
  <div class="code-container">
    <pre class="err-code" v-html="dealCodeResult"></pre>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  origin: {
    type: Object,
    default: () => {},
  },
});
const encodeHTML = (str) => {
  if (!str || str.length == 0) return "";
  return str
    .replace(/&/g, "&#38;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
};
const dealCodeResult = computed(() => {
  console.log(props.origin);
  const line = props.origin?.line;
  const originCodeLine = props.origin?.source.split("\n");
  const len = originCodeLine.length - 1;
  const start = line - 3 >= 0 ? line - 3 : 0;
  const end = start + 5 >= len ? len : start + 5; //最多展示6行
  let newLines = [];
  for (let i = start; i <= end; i++) {
    const content = i + 1 + ".   " + encodeHTML(originCodeLine[i]);
    newLines.push(
      `<div class='err-code ${
        i + 1 == line ? "heightlight" : ""
      }'>${content}</div>`
    );
  }
  return newLines.join("");
});
</script>
<style scoped></style>