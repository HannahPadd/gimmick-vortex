<template>
  <div v-if="charts && charts.length > 0" class="chart-container">
    <h3>Charts:</h3>
    <div v-for="(chart, index) in charts" :key="index" class="chart">
      <h4>Chart Type: {{ chart.type }}</h4>
      <h4>Difficulty: {{ chart.difficultyNumber }} {{ chart.difficulty }}</h4>
      <div class="measures-container">
        <div v-for="(measure, measureIndex) in processedNotes(chart.notes)" :key="measureIndex">
          <div class="measure">
            <h5>Measure {{ measureIndex + 1 }}</h5>
            <div class="note-row">
              <template v-for="(noteGroup, noteGroupIndex) in measure" :key="noteGroupIndex">
                <!-- Debugging output -->
                <div>{{ noteGroup }} - {{ Array.isArray(noteGroup) ? 'Array' : 'String' }}</div>
                <div class="note-cell">
                  <!-- Ensure proper condition for noteGroup -->
                  <div v-if="isNoteOne(noteGroup)" class="arrow">
                    &#x25B2;
                    <!-- Replace with your arrow icon or image -->
                  </div>
                  <div v-else-if="isComma(noteGroup)" class="comma">,</div>
                  <div v-else>&nbsp;</div>
                </div>
                <!-- Add a line break after every 4 notes -->
                <br v-if="(noteGroupIndex + 1) % 4 === 0 && noteGroupIndex < measure.length - 1" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>No charts available.</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

interface ChartData {
  chartHeader: string
  type: string
  tag: string
  difficultyNumber: string
  difficulty: string
  notes: string[][] // Ensure your notes are defined as string[][]
}

export default defineComponent({
  name: 'ChartRenderer',
  props: {
    charts: {
      type: Array as PropType<ChartData[]>,
      required: true
    }
  },
  methods: {
    processedNotes(notes: string[][]): string[][][] {
      const processed: string[][][] = []
      let currentMeasure: string[][] = []

      for (const note of notes) {
        if (note[0] === ',') {
          processed.push(currentMeasure)
          currentMeasure = []
        } else {
          currentMeasure.push(note)
        }
      }

      // Push the last measure
      if (currentMeasure.length > 0) {
        processed.push(currentMeasure)
      }

      return processed
    },
    isNoteOne(noteGroup: string | string[]): boolean {
      // Handle both string and string[] cases
      if (Array.isArray(noteGroup)) {
        // Check if any element in the array is '1'
        return noteGroup.includes('1')
      } else {
        // Directly compare if it's a string
        return noteGroup === '1'
      }
    },
    isComma(noteGroup: string | string[]): boolean {
      // Handle both string and string[] cases
      if (Array.isArray(noteGroup)) {
        // Check if the array contains only one element which is ','
        return noteGroup.length === 1 && noteGroup[0] === ','
      } else {
        // Directly compare if it's a string
        return noteGroup === ','
      }
    }
  }
})
</script>

<style scoped>
/* Your scoped styles here */
</style>
