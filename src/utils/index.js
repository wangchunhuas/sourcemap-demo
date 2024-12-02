import axios from "axios";
import sourceMap from "source-map-js";
const getSourceMap = async (url) => {
  // url:另外存放map文件的服务器
  const res = await axios.get(url);
  return res;
};

const sourceMapReflectErrorCode = async (StackFrame) => {
  const _sourcemap = await getSourceMap(StackFrame.fileName + ".map");
  const fileContent = _sourcemap.data;
  // 解析map文件
  const consumer = new sourceMap.SourceMapConsumer(fileContent);
  // 通过报错的位置查找源文件名称以及报错行数
  const _original = consumer.originalPositionFor({
    line: StackFrame.lineNumber,
    column: StackFrame.columnNumber || 0,
  });
  const _code = consumer.sourceContentFor(_original.source);
  console.log(_code);
};

export default sourceMapReflectErrorCode;
