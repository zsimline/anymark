<template>
  <div id="msg-list">
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
#msg-list {
  flex: 1 1 auto;
  margin: 0.8rem 0rem;
  position: relative;
  overflow: hidden;
}
#msg-list:hover {
  overflow: auto;
}

/** Custom scroll bar */
#msg-list::-webkit-scrollbar {
  width: 5px;
  position: relative;
}
#msg-list::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: transparent;
}
#msg-list::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0,0,0,0.4);
}
</style>