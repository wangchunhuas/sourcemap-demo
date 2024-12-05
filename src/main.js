import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index";
import ErrorStackParser from "error-stack-parser";
import { createPinia } from "pinia";
import sourceMapReflectErrorCode from "./utils/index";
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(pinia);
app.config.errorHandler = (err, vm) => {
  const errorStack = ErrorStackParser.parse(err);
  // sourceMapReflectErrorCode(errorStack[0]);
  const jsError = {
    stack_frames: errorStack,
    message: err.message,
    stack: err.stack,
    error_name: err.name,
  };
  vm.$message.error(`您触发了一个${err.name} 错误`);
  localStorage.setItem("jserror", JSON.stringify(jsError));
};
app.mount("#app");
