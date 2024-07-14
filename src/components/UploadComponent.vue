<template>
  <div class="uploadComponent">
    <input class="glass-button" type="file" @change="handleFileChange" />
    <button class="glass-button" @click="handleFileUpload">Upload</button>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="songData">
      <!-- Render songData details using SongDetails component -->
      <SongDetails :songData="songData" />
    </div>
  </div>
  <div v-if="!isLoading" class="editor">
    <!-- Render ChartEditor and pass charts data -->
    <ChartEditor :charts="songData.charts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import SongDetails from './SongDetails.vue'
import ChartEditor from './ChartEditor.vue'

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
    ChartEditor
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
        console.log(this.songData.charts)
      }
    }
  }
})
</script>

<style scoped>
.uploadComponent {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;

}
</style>
