<template>
  <div id="app">
    <area-l></area-l>
    <area-r></area-r>
  </div>
</template>

<script>
import AreaL from "./components/AreaL.vue"
import AreaR from "./components/AreaR.vue";

export default {
  name: 'app',
  components: {
    AreaL,
    AreaR
  },
  methods: {
  }
}
</script>

<style>
:root {
  font-size: 10px;
  --main-color: hsl(195, 68%, 57%);
  --mask-color: hsl(0, 0%, 95%);

  /** Font */
  --font-size: 14px;
}

body {
  margin: 0px;
  font-family: "WenQuanYi";
}

.nochoose {
  user-select: none;
}

input {
  border: none;
  outline: none;
}

#app {
  display: flex;
}

</style>