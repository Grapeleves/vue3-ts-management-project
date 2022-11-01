<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量（饼图）"></card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市产品销量"></card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量（玫瑰图）"></card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品销量">
          <base-echart></base-echart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品收藏"></card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useStore } from "vuex"

import Card from "@/baseComponent/card"
import BaseEchart from "@/baseComponent/echart"

export default defineComponent({
  name: "dashboard",
  components: { Card, BaseEchart },
  setup() {
    const store = useStore()
    store.dispatch("dashboard/getDashboardDataAction")
    return {}
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 15px;
}
</style>
