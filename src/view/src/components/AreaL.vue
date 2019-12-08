<template>
  <div id="area-l" :style="{ width: myWidth }">
    <search-box></search-box>
    <msg-list></msg-list>
    <div class="split-line" @mousedown="resize"></div>
  </div>
</template>

<script>
import SearchBox from './SearchBox.vue'
import MsgList from "./MsgList.vue";

export default {
  data: function() {
    return {
      myWidth: '25%',
    }
  },

  methods: {
    resize() {
      const onMouseMove = (e) => {
        this.myWidth = `${e.pageX}px`;
      }
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } 
  },

  components: {
    SearchBox,
    MsgList
  }
}
</script>

<style>
#area-l {
  min-width: 26rem;
  max-width: 98rem;
  height: 100vh;
  padding: 0.8rem 0rem;
  position: relative;
}

.split-line {
  position: absolute;
  right: -6px;
  top: 0px;
  width: 1px;
  padding-right: 5px;
  height: 100%;
  z-index: 10;
  color: transparent;
  cursor: ew-resize;
  background-color: #AAA;
  background-clip: content-box;
}

</style>
