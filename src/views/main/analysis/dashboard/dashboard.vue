<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量（饼图）">
          <pie-echart :pie-data="categoryGoodsCount"></pie-echart>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市产品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量（玫瑰图）">
          <rose-echart :rose-data="categoryGoodsCount"></rose-echart>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "vuex"

import Card from "@/baseComponent/card"
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from "@/components/page-echaets"

export default defineComponent({
  name: "dashboard",
  components: { Card, PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart },
  setup() {
    const store = useStore()
    store.dispatch("dashboard/getDashboardDataAction")

    // 图一、图三数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })
    // 图二数据
    const addressGoodsSale = computed(() => {
      const xLabels: string[] = []
      const lineData: any[] = []

      return store.state.dashboard.adddressGoodsSale.map((item: any) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })

    // 图四数据
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const lineData: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        lineData.push(item.goodsCount)
      }

      return { xLabels, lineData }
    })

    //图五数据
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const barData: any[] = []

      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        barData.push(item.goodsFavor)
      }

      return { xLabels, barData }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 15px;
}
</style>
