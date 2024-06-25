<template>
  <div v-if="charts && charts.length > 0" class="chart-container">
    <h3>Charts:</h3>
    <div v-for="(chart, index) in charts" :key="index" class="chart">
      <h4>Chart Type: {{ chart.type }}</h4>
      <h4>Difficulty: {{ chart.difficultyNumber }} {{ chart.difficulty }}</h4>
      <div class="measures-container">
        <div v-for="(measure, measureIndex) in chart.notes" :key="measureIndex" class="measure">
          <h5>Measure {{ measureIndex + 1 }}</h5>
          <div
            v-for="(noteGroup, noteGroupIndex) in measure"
            :key="noteGroupIndex"
            class="note-row"
          >
            <div v-for="(note, noteIndex) in noteGroup" :key="noteIndex" class="note-cell">
              <div v-if="note === '1'" class="arrow">
                &#x25B2;
                <!-- You can replace this with an arrow image or icon -->
              </div>
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
  notes: string[][]
}

export default defineComponent({
  name: 'ChartRenderer',
  props: {
    charts: {
      type: Array as PropType<ChartData[]>,
      required: true
    }
  }
})
</script>

<style scoped>
.chart-container {
  margin-top: 20px;
}

.chart {
  margin-bottom: 20px;
}

.notes-container {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.note-row {
  display: flex;
}

.note-cell {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  margin: 1px;
}

.arrow {
  color: red; /* Change this to style your arrow */
}
</style>
