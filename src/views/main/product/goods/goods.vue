<template>
  <div class="goods">
    <h2>goods</h2>
    <page-table ref="pageTableRef" :tableConfig="tableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          preview-teleported
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageTable from "@/components/page-table"
import { tableConfig } from "./config/table.config"

export default defineComponent({
  name: "goods",
  components: { PageTable },
  setup() {
    return {
      tableConfig
    }
  }
})
</script>

<style scoped></style>
