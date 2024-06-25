<template>
  <div class="home">
    <h2>Welcome to Gimmick Vortex!</h2>
    <p>You can either upload a stepfile and start editing it or create a new one</p>
  </div>
  <div class="content">
    <UploadComponent />
    <ChartRenderer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadComponent from '@/components/UploadComponent.vue'
import ChartRenderer from '@/components/ChartRenderer.vue'

export default defineComponent({
  components: {
    ChartRenderer,
    UploadComponent
  }
})
</script>

<style scoped></style>
