<template>
  <div id="msg-toolkit">
    <div id="msg-input">
      <div>{{ msg }}</div>
      <textarea id="msg-input" placeholder="输入消息..." v-model="msg"></textarea>
    </div> 
    <button>哈哈哈哈哈哈</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: ''
    }
  }
}
</script>

<style>
#msg-toolkit {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 8%;
  display: flex;
}

#msg-input {
  flex: 0 0 80%;
  position: relative;
}

#msg-input div,
#msg-input textarea {
  font-size:  var(--font-size);
  line-height: calc(var(--font-size) + 4px);
  padding: 1.5rem 0rem;
}

#msg-input div {
  visibility: hidden;
  max-height: 22rem;
  overflow: hidden;
}

#msg-input textarea {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  padding-left: 8px;
  box-sizing: border-box;
  outline: none;
  border: none;
  resize: none;
}
#msg-input textarea::-webkit-scrollbar {
  display: none;
}

button {
  flex: 0 0 20%;
  border:none;
  padding: 0px;
}
</style>