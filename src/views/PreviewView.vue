<template>
  <div class="preview">
    <h2>Chart preview</h2>
    <Songdetails songData="songData" />
    <ChartPreview charts="chartData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChartPreview from '@/components/ChartPreview.vue'
import SongDetails from '@/components/SongDetails.vue'

export default defineComponent({
  components: {
    ChartPreview,
    SongDetails
  },
  props: {
    songData: {
      type: Object,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  }
})
</script>
