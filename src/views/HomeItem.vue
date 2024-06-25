<template>
  <h1>Gimmick Vortex</h1>
  <div>
    <UploadComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadComponent from '@/components/UploadComponent.vue'

export default defineComponent({
  components: {
    UploadComponent
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
