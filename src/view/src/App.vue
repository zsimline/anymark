<template>
  <div id="app">
    <msg-frame></msg-frame>
    <chat-area></chat-area>
  </div>
</template>

<script lang="ts">
import MsgFrame from "./components/MsgFrame.vue";
import ChatArea from "./components/ChatArea.vue";

export default {

  name: 'app',
  components: {
    MsgFrame,
    ChatArea
  },
}
</script>

<style>
:root {
  font-size: 10px;
  --main-color: hsl(195, 68%, 57%);
  --mask-color: hsl(0, 0%, 95%);
}

body {
  margin: 0px;
  font-family: "WenQuanYi"
}

.nochoose {
  user-select: none;
}

input {
  border: none;
  outline: none;
}

#app {
  display: flex;
}




</style>