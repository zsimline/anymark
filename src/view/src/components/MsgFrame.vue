<template>
  <div id="msg-frame">
    <msg-box></msg-box>
  </div>
</template>

<script lang="ts">
import MsgBox from './MsgBox.vue'

export default {
  components: {
    MsgBox,
  }
}
</script>

<style>
#msg-frame {
  height: 100vh;
  padding: 0.8rem 0rem;
  position: relative;
  overflow: hidden;
}
#msg-frame:hover {
  overflow: auto;
}

/** Custom scroll bar */
#msg-frame::-webkit-scrollbar {
  width: 5px;
  position: relative;
}
#msg-frame::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: transparent;
}
#msg-frame::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0,0,0,0.4);
}
</style>