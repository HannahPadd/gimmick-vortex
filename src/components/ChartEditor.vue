<template>
  <div name="ChartEditor" class="pixi-container">
    <div ref="pixiContainer" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts">
import { StepEngine } from '@/engine/StepEngine'
import { defineComponent } from 'vue'
const stepEngine = new StepEngine([])
stepEngine.init()

export default defineComponent({
  name: 'ChartEditor'
})
</script>
