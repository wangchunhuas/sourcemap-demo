<template>
  <div class="container">
    <div class="content">
      <div><router-link to="/">Home</router-link></div>
      <div><router-link to="/about">About</router-link></div>
      <div><router-link to="/error">trigger</router-link></div>
    </div>
    <div class="viewcontent">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

.content {
  width: 100%;
  height: 20%;
  background-color: #ccc;

  display: flex;
  justify-content: center;
  align-items: center;
}
.viewcontent {
  flex: 1;
  height: 100%;
}
.content div {
  margin: 0 20px;
}
</style>