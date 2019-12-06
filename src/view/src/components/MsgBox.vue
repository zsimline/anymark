<template>
  <div class="msg-box">
    <div class="msg-box-l">
      <img draggable="false" class="avatar" src="../assets/00tx.png">
    </div>
    <div class="msg-box-r">
      <h4 class="msg-title">开发项目组</h4>
      <p class="msg-summary">最新公告：请组xxx内开发人员与今晚九点</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.msg-box {
  width: 100%;
  height: 10vh;
  padding: 8px 0px;
  box-sizing: border-box;
  display: flex;
  user-select: none;
}

.msg-box-l {
  flex: 0 0 20%;
}
.msg-box-r {
  flex: 0 0 80%;
}

.avatar {
  width: 80%;
  margin: 0px 10%;
  border-radius: 50%;
  
}

.msg-title {
  margin: 5px;
}

.msg-summary {
  width: 90%;
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #444;
  font-size: 14px;
  
}
</style>