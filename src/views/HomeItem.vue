<template>
  <NavBar />

  <div class="content">
    <UploadComponent />
    <ChartRenderer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'
import UploadComponent from '@/components/UploadComponent.vue'
import ChartRenderer from '@/components/ChartRenderer.vue'

export default defineComponent({
  components: {
    NavBar,
    ChartRenderer,
    UploadComponent
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
