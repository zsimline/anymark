<template>
  <div class="msg-box"
      :class="{ active: isActive }"
      @click="changeActive"
      >
    <div class="msg-box-l">
      <img draggable="false" class="avatar" src="../assets/00tx.png">
    </div>
    <div class="msg-box-r">
      <h3 class="msg-title">开发项目组</h3>
      <div class="msg-summary">最新公告：请组内开发人员于今晚九点请组内开发人员与今晚九点 </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isActive: false,
    }
  },

  methods: {
    changeActive() {
      this.isActive = true;
    }
  }
}
</script>

<style scoped>
.msg-box {
  display: flex;
  width: 100%;
  height: 6.8rem;
  box-sizing: border-box;
  padding: 0.8rem 0rem;
  user-select: none;
  cursor: pointer;
}
.msg-box:hover {
  background-color: var(--mask-color);
}

.active {
  color: #fff;
  background-color: var(--main-color) !important;
}

.msg-box-l {
  flex: 0 0 6.8rem;
  padding: 0rem 0.8rem;
  box-sizing: border-box;
}
.msg-box-r {
  width: 0px;
  flex: 1 0 auto;
}

.avatar {
  width: 100%;
  border-radius: 50%;
}

.msg-title {
  margin: 0px;
  font-size: 1.6rem;
  line-height: 3rem;
}

.msg-summary {
  font-size: 1.4rem;
  line-height: 2.2rem;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #444;
}
</style>
