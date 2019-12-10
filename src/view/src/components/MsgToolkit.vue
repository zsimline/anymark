<template>
  <div id="msg-toolkit">
    <button class="btn-tool"><i class="icon-annex"></i></button>
    <msg-input v-model="msg"></msg-input>
    <button class="btn-tool"><i class="icon-command"></i></button>
    <button class="btn-tool"><i class="icon-smile"></i></button>
    <button class="btn-tool"><i class="icon-voice"></i></button>
  </div>
</template>

<script>
import MsgInput from "./msg-toolkit/MsgInput.vue";

export default {
  data: function() {
    return {
      msg: '哈哈哈哈'
    }
  },

  components: {
    MsgInput
  },
}
</script>

<style>
#msg-toolkit {
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  border-left: solid 1px #DDDEEE;
  box-sizing: border-box;
  background-color: #fff;
}

.btn-tool {
  flex: 0 0 5rem;
  height: 5rem;
  padding: 1rem;
  opacity: 0.8;
}
.btn-tool:hover {
  opacity: 1;
}
</style>