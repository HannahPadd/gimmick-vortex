<template>
  <div class="songdetails-container">
    <h2>Songname: {{ songData.title }}</h2>
    <p>Artist: {{ songData.artist }}</p>
    <p>BPMS: {{ songData.bpms }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface SongData {
  title: string
  artist: string
  bpms: string
}

export default defineComponent({
  props: {
    songData: {
      type: Object as PropType<SongData>,
      required: true
    }
  }
})
</script>

<style scoped>
.songdetails-container {
  margin-top: 50px;
}
</style>
