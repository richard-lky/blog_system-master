<template>
  <div id="app">
    <router-view></router-view>
    <music></music>
  </div>
</template>


<script>
import Music from './components/Music.vue'

export default {
  name: "App",
  components: {
    Music,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
