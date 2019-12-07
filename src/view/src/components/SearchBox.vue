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
  width: 100%;
  margin-bottom: 0.8rem;
}

#search-box input {
  width: 90%;
  height: 30px;
  display: block;
  margin: auto;
  padding-left: 10px;
  border-radius: 3px;
  background-color: var(--mask-color);
}
</style>
