<template>
  <div name="ChartEditor" class="pixi-container">
    <div ref="pixiContainer" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts">
import { StepEngine } from '@/engine/StepEngine'
import { defineComponent } from 'vue'

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
      const stepEngine = new StepEngine(props.charts)
      stepEngine.init()
    })
  }
})
</script>
