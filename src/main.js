import { createApp } from "vue";
import App from "./App.vue";
import ErrorStackParser from "error-stack-parser";
import sourceMapReflectErrorCode from "./utils/index";
const app = createApp(App);
app.config.errorHandler = (err, vm) => {
  const errorStack = ErrorStackParser.parse(err);
  sourceMapReflectErrorCode(errorStack[0]);
};
app.mount("#app");
