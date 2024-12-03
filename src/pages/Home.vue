<template>
  <div>
    <div v-if="isError">
      <pre>{{ _jserror.stack }}</pre>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in _jserror.stack_frames"
          :key="index"
          :name="index"
          :title="item.source"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <div>{{ item.fileName }}</div>
            </el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                size="small"
                @click="viewDescLogInfos(item, index)"
                >源码映射</el-button
              ></el-col
            >
          </el-row>
          <el-row :gutter="20">
            <template v-if="item.origin"> {{ item.origin }}</template>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <el-dialog v-model="dialogVisible" title="sourceMap源码定位" width="500">
        <el-tabs
          v-model="tabactiveName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="本地上传" name="local">
            <el-upload drag :befor-upload="shourceMapUpload">
              <div>将文件拖到此处或者<em>点击上传</em></div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="远程加载" name="distance">远程加载</el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <div v-else>首页</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import sourceMap from "source-map-js";
let _jserror = ref(null);
let isError = ref(false);
let dialogVisible = ref(false);
let tabactiveName = ref("local");
onMounted(() => {
  try {
    if (JSON.parse(localStorage.getItem("jserror"))) {
      isError.value = true;
      _jserror.value = JSON.parse(localStorage.getItem("jserror"));
    }
  } catch (e) {
    console.log(e);
  }
});

const stackFrames = {
  line: 0,
  column: 0,
  index: 0,
};
const viewDescLogInfos = (item, index) => {
  dialogVisible.value = true;
  stackFrames = {
    line: item.lineNumber,
    column: item.columnNumber,
    index: index,
  };
};

const shourceMapUpload = async (file) => {
  if (!file.name.endsWith(".map")) {
    ElMessage.error("请传入正确的map文件");
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file, "utf-8");
  reader.onload = async function (e) {
    const code = await getSource(
      e.target?.result,
      stackFrames.line,
      stackFrames.column
    );
    _jserror.value.stack_frames[stackFrames.index].origin = code;
    dialogVisible.value = false;
  };
};

const getSource = async (sourcemap, line, column) => {
  try {
    const consumer = new sourceMap.SourceMapConsumer(JSON.parse(sourcemap));
    const _original = consumer.originalPositionFor({
      line: line,
      column: column,
    });
    const _code = consumer.sourceContentFor(_original.source);
    return {
      source: _code,
      line: _original.line,
      column: _original.column,
    };
  } catch (e) {
    ElMessage.error("sourcemap解析失败");
  }
};
</script>
<style scoped></style>