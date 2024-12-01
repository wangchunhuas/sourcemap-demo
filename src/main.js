import { createApp } from "vue";
import App from "./App.vue";
import websdks from "../../../src/webSdk.js";

const app = createApp(App);
app.use(websdks, {
  url: "http://localhost:3030/reportDate",
});
app.mount("#app");
