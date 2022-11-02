<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEchart from "@/baseComponent/echart"
import { IDataType } from "../type"

const props = defineProps<{
  pieData: IDataType[]
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }
})
</script>

<style scoped lang="less"></style>
