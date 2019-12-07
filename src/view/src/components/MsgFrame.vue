<template>
  <div class="msg-frame" 
       :style="{width: changeWidth}">
    <search-box></search-box>
    <msg-box></msg-box>
  </div>
</template>

<script lang="ts">
import MsgBox from './MsgBox.vue';
import SearchBox from './SearchBox.vue'

export default {
  data: function() {
    return {
    }
  },

  computed: {
    changeWidth() {
      return '25%';
    }
  },
  components: {
    MsgBox,
    SearchBox,
  }
}
</script>

<style scoped>

.msg-frame {
  min-width: 26rem;
  min-height: 100vh;
  padding: 0.8rem 0rem;
}

.split-line {
  position: absolute;
  left: 0px;
  width: 1px;
  padding-right: 2px;
  height: 100vh;
  z-index: 10;
  color: transparent;
  cursor: ew-resize;
  background-color: #AAA;
  background-clip: content-box;
}
</style>
