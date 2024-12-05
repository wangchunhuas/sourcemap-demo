<template>
  <div class="play-container">
    <div class="btn">
      <el-button @click="onPlayHandle" type="primary">回放录像</el-button>
    </div>

    <div id="playInfos"></div>
  </div>
</template>
<script setup>
import rrwebPlayer from "rrweb-player";
import { useEventsStore } from "../stores/events";
import "rrweb-player/dist/style.css";
const eventsStore = useEventsStore();
let events = eventsStore.getEvents();

const onPlayHandle = () => {
  if (events.length === 0) return;
  new rrwebPlayer({
    target: document.querySelector("#playInfos"),
    props: {
      events,
    },
  });
};
</script>
<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-content: center;

  margin: 10px 0;
}

#playInfos {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>