<template>
  <NavBar />
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  }
})
</script>

<style>
/* Add your styles here */
</style>
