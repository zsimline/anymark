<template>
  <div id="chat-area">
    <msg-frame></msg-frame>
  </div>
</template>

<script>
import MsgFrame from './MsgFrame.vue'

export default {

  components: {
    MsgFrame
  }
}
</script>

<style>

#chat-area {
  flex: auto;
  display: flex;
  user-select: none;
}


</style>
