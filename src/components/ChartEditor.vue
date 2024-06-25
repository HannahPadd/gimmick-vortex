<template>
  <div name="ChartEditor" class="pixi-container">
    <div ref="pixiContainer" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts">
import { initializePixi } from '@/engine/view.ts'
export default {
  name: 'ChartEditor',
  props: {
    chartData: {
      type: Array as () => string[][],
      required: true
    }
  },
  setup(props) {
    const pixiContainer = ref<HTMLDivElement | null>(null)
    let app: PIXI.Application | null = null

    onMounted(() => {
      if (pixiContainer.value) {
        // Call initializePixi function with options
        app = initializePixi({
          container: pixiContainer.value,
          chartData: props.chartData
        })
      }
    })

    return {
      pixiContainer
    }
  }
}
</script>
