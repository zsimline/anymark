<template>
    <div
      id="msg-input"
      contenteditable="true"
      @input="changeText"
    >{{ innerText }}</div>
</template>

<script>
export default{
  props: ['value'],
  
  data: function() {
    return {
      innerText: this.value,
    }
  },
  
  methods: {
    changeText(){
      this.$emit('input', this.$el.innerText);
    }
  }
}
</script>

<style>
#msg-input {
  flex: auto;
  font-size: 14px;
  outline: none;
  padding: 1.5rem;
  line-height: 2rem;
}
#msg-input:empty::before {
  content: "输入消息...";
  color: #999999;
}
#msg-inut:focus {
  content: none;
}
</style>