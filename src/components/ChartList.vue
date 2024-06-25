<template>
  <div v-if="charts && charts.length > 0">
    <h3>Charts:</h3>
    <div v-for="(chart, index) in charts" :key="index">
      <h4>Chart Type: {{ chart.type }}</h4>
      <h4>Difficulty: {{ chart.difficultyTag }} {{ chart.difficulty }}</h4>
      <ul>
        <li v-for="(noteGroup, noteGroupIndex) in chart.notes" :key="noteGroupIndex">
          {{ noteGroup.join(', ') }}
        </li>
      </ul>
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
  difficultyTag: string
  difficulty: string
  notes: string[][]
}

export default defineComponent({
  props: {
    charts: {
      type: Array as PropType<ChartData[]>,
      required: true
    }
  }
})
</script>
