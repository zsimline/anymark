<template>
  <div class="msg-frame" 
       :style="{width: changeWidth}">
    <msg-box></msg-box>
  </div>
</template>

<script lang="ts">
import MsgBox from './MsgBox.vue';

export default {
  data: function() {
    return {
      width: "200px"
    }
  },

  computed: {
    changeWidth() {
      return '25%';
    }
  },
  components: {
    MsgBox,
  }
}
</script>

<style scoped>

.msg-frame {
 
}

</style>
