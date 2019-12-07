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
    SearchBox,
  }
}
</script>

<style scoped>

.msg-frame {
  min-width: 260px;
  padding: 8px 0px;
}

</style>
