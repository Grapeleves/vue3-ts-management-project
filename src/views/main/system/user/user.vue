<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-table :tableConfig="tableConfig" pageName="users"></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageSearch from "@/components/page-search"
import PageTable from "@/components/page-table"
import { searchFormConfig } from "./config/search.config"
import { tableConfig } from "./config/table.config"

export default defineComponent({
  name: "user",
  components: { PageSearch, PageTable },
  setup() {
    return {
      searchFormConfig,
      tableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
