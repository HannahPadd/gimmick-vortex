<template>
  <div ref="pixiContainer" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { initializePixi, PixiRendererOptions } from '@/engine/view.ts' // Adjust the path as per your project structure

export default defineComponent({
  name: 'ChartRenderer',
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
})
</script>

<style scoped>
/* Optional scoped styles */
</style>
