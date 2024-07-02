<template>
  <div class="home">
    <h2>Welcome to Gimmick Vortex!</h2>
    <p>You can either upload a stepfile and start editing it or create a new one</p>
  </div>
  <div class="upload">
    <UploadComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChartEditor from '@/components/ChartEditor.vue'
import UploadComponent from '@/components/UploadComponent.vue'

export default defineComponent({
  components: {
    ChartEditor,
    UploadComponent
  }
})
</script>

<style scoped></style>
