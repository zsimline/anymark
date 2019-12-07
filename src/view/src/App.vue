<template>
  <div id="app">
    <msg-frame></msg-frame>
  </div>
</template>

<script lang="ts">
import MsgFrame from "./components/MsgFrame.vue";

export default {

  name: 'app',
  components: {
    MsgFrame,
  }
}
</script>

<style>
body {
  margin: 0px;
  font-size: 16px;
  font-family: "WenQuanYi"
}

.nochoose {
  user-select: none;
}

input {
  border: none;
  outline: none;
}


</style>