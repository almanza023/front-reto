<template>
  <TareasVue></TareasVue>
</template>

<script>

import TareasVue from './pages/Tareas.vue'

TareasVue

export default {
  name: 'App',
  components: {
    TareasVue
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
