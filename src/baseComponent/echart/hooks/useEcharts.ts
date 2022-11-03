import * as echarts from "echarts"

import chinaMapData from "../data/china.json"

echarts.registerMap("china", chinaMapData)

export default function (el: HTMLElement) {
  const echartInsrance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInsrance.setOption(options)
  }

  // 监听浏览器窗口大小变化，实时缩放
  window.addEventListener("resize", () => {
    echartInsrance.resize()
  })

  // 抛出函数，方便外部可以调用来改变图标的大小
  const updateSize = () => {
    echartInsrance.resize()
  }

  return { echartInsrance, setOptions, updateSize }
}
