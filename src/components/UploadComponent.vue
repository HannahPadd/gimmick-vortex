<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="handleFileUpload">Upload</button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="songData">
      <!-- Render songData details using SongDetails component -->
      <SongDetails :songData="songData" />
      <!-- Render charts using ChartList component -->
      <ChartPreview :charts="songData.charts" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import SongDetails from './SongDetails.vue'
import ChartPreview from './ChartPreview.vue'

interface SongData {
  title: string
  artist: string
  bpms: string
  charts: ChartData[]
}

interface ChartData {
  chartHeader: string
  type: string
  tag: string
  difficultyNumber: string
  difficulty: string
  notes: string[][]
}

export default defineComponent({
  components: {
    SongDetails,
    ChartPreview
  },
  data() {
    return {
      file: null as File | null,
      isLoading: false,
      songData: {} as SongData,
      chartsData: [] as ChartData[]
    }
  },
  methods: {
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        this.file = target.files[0]
      }
    },
    async handleFileUpload() {
      if (!this.file) {
        return
      }
      try {
        this.isLoading = true
        const formData = new FormData()
        formData.append('file', this.file.slice(), this.file.name)

        const response = await axios.post<SongData>('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        // Update songData only if response is successful
        this.songData = response.data
      } catch (error) {
        console.error('Error uploading file:', error)
        // Handle error state or notify the user
      } finally {
        this.isLoading = false
        const serializedChartsData = JSON.stringify(this.songData.charts)
        this.$router.push({
          name: 'preview',
          params: { songData: this.songData, chartData: this.songData.charts }
        })
        console.log(this.songData.charts)
      }
    }
  }
})
</script>
