<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue"
import type { EChartsOption } from "echarts"
import useEcharts from "../hooks/useEcharts"

// 定义props
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: "100%",
    height: "360px"
  }
)

const echartRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEcharts(echartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped lang="less"></style>
