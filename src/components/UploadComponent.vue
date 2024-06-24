<template>
    <div>
      <h1>StepMania .sm File Viewer</h1>
      <input type="file" @change="handleFileChange" />
      <button @click="handleFileUpload">Upload</button>
      <div v-if="songData">
        <h2>{{ songData.title }} by {{ songData.artist }}</h2>
        <p><strong>BPMS:</strong> {{ songData.bpms }}</p>
        <div>
          <h3>Notes</h3>
          <div v-for="(note, index) in songData.notes" :key="index">
            <pre>{{ note }}</pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  interface SongData {
    title: string;
    artist: string;
    bpms: string;
    notes: string[];
  }
  
  export default defineComponent({
    data() {
      return {
        file: null as File | null,
        songData: null as SongData | null
      };
    },
    methods: {
      handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
          this.file = target.files[0];
        }
      },
      async handleFileUpload() {
        if (!this.file) return;
  
        const formData = new FormData();
        formData.append('file', this.file);
  
        try {
          const response = await axios.post<SongData>('http://localhost:5000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.songData = response.data;
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    }
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  