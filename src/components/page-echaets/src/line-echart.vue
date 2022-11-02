<template>
  <div class="line-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEchart from "@/baseComponent/echart"

const props = defineProps<{
  lineData: any[]
  xLabels: string[]
}>()

const options = computed(() => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: props.lineData,
        type: "line",
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
