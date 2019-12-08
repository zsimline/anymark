<template>
  <div id="chat-area">
    <navigator></navigator>
    <msg-frame></msg-frame>
    <msg-toolkit></msg-toolkit>
  </div>
</template>

<script>
import MsgFrame from './MsgFrame.vue'
import Navigator from './Navigator.vue'
import MsgToolkit from './MsgToolkit.vue'

export default {
  components: {
    MsgFrame,
    MsgToolkit,
    Navigator
  }
}
</script>

<style>

#chat-area {
  flex: auto;
  display: flex;
  flex-direction: column;
  user-select: none;
}


</style>
