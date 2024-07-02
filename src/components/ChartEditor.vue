<template>
  <div name="ChartEditor" class="pixi-container">
    <div ref="pixiContainer" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts">
import { StepEngine } from '@/engine/StepEngine'
import { defineComponent, onMounted, PropType, toRaw } from 'vue'

interface ChartData {
  chartHeader: string
  type: string
  tag: string
  difficultyNumber: string
  difficulty: string
  notes: string[][]
}

export default defineComponent({
  name: 'ChartEditor',
  props: {
    charts: {
      type: Array as PropType<ChartData[]>,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      if (props.charts && Array.isArray(props.charts)) {
        // Extract only the notes from each chart
        const notes = JSON.parse(JSON.stringify(props.charts.map((chart) => chart.notes)))
        console.log('Notes:', notes)
        const stepEngine = new StepEngine(notes[0])
        stepEngine.init()
      } else {
        console.error('Charts prop is undefined or not an array:', props.charts)
      }
    })
  }
})
</script>
