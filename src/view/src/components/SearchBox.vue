<template>
  <div id="search-box">
    <input type="text" placeholder="搜索">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#search-box {
  flex: 0 0 auto;
  margin-bottom: 0.8rem;
  text-align: center;
}

#search-box input {
  width: 90%;
  height: 3rem;
  padding-left: 1rem;
  border-radius: 3px;
  background-color: var(--mask-color);
}
</style>