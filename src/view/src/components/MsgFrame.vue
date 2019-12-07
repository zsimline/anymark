<template>
  <div class="msg-frame" :style="{width: myWidth}">
    <search-box></search-box>
    <msg-box></msg-box>
     <msg-box></msg-box>
     <msg-box></msg-box>
      <msg-box></msg-box>
       <msg-box></msg-box>
        <msg-box></msg-box>
         <msg-box></msg-box>
          <msg-box></msg-box>
           <msg-box></msg-box>
            <msg-box></msg-box>
             <msg-box></msg-box>
              <msg-box></msg-box>
                  <msg-box></msg-box>
     <msg-box></msg-box>
     <msg-box></msg-box>
      <msg-box></msg-box>
       <msg-box></msg-box>
        <msg-box></msg-box>
         <msg-box></msg-box>
          <msg-box></msg-box>
           <msg-box></msg-box>
            <msg-box></msg-box>
             <msg-box></msg-box>
              <msg-box></msg-box>
     <msg-box></msg-box>
     <msg-box></msg-box>
      <msg-box></msg-box>
       <msg-box></msg-box>
        <msg-box></msg-box>
         <msg-box></msg-box>
          <msg-box></msg-box>
           <msg-box></msg-box>
            <msg-box></msg-box>
             <msg-box></msg-box>
              <msg-box></msg-box>
     <msg-box></msg-box>
     <msg-box></msg-box>
      <msg-box></msg-box>
       <msg-box></msg-box>
        <msg-box></msg-box>
         <msg-box></msg-box>
          <msg-box></msg-box>
           <msg-box></msg-box>
            <msg-box></msg-box>
             <msg-box></msg-box>
              <msg-box></msg-box>
  </div>
</template>

<script lang="ts">
import MsgBox from './MsgBox.vue';
import SearchBox from './SearchBox.vue'

export default {
  data: function() {
    return {
      myWidth: '25%',
    }
  },

  methods: {
    resize() {
      const onMouseMove = (e) => {
        this.myWidth = `${e.pageX + 5}px`;
        window.console.log(this.myWidth);
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
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
  max-width: 98rem;
  min-height: 100vh;
  padding: 0.8rem 0rem;
  position: relative;
  overflow-y: scroll;
}


.split-line {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 1px;
  padding-left: 5px;
  height: 100%;
  z-index: 10;
  color: transparent;
  cursor: ew-resize;
  background-color: #AAA;
  background-clip: content-box;
}
</style>
