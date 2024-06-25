<template>
  <TopBar />
  <div class="content">
    <UploadComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploadComponent from '@/components/UploadComponent.vue'
import TopBar from '@/components/TopBar.vue'

export default defineComponent({
  components: {
    TopBar,
    UploadComponent
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
