<template>
  <div id="chat-area">
    <div class="split-line" 
    @mousedown="resize"></div>
  </div>
</template>

<script>
export default {
  methods: {
    resize(e) {
      window.console.log(e);
    }
  }
}
</script>

<style>

#chat-area {
  flex: auto;
  display: flex;
  position: relative;
}

.split-line {
  position: absolute;
  left: 0px;
  width: 1px;
  padding-right: 2px;
  height: 100%;
  z-index: 10;
  color: transparent;
  cursor: ew-resize;
  background-color: #AAA;
  background-clip: content-box;
}
</style>
