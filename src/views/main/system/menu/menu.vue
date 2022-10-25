<template>
  <div class="menu">
    <PageTable :tableConfig="tableConfig" pageName="menu"> </PageTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageTable from "@/components/page-table"
import { tableConfig } from "./config/table.config"

export default defineComponent({
  name: "menuPage",
  components: { PageTable },
  setup() {
    return { tableConfig }
  }
})
</script>

<style scoped></style>
