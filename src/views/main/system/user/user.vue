<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetFormData="handleResetClick"
      @queryTableData="handleQueryTableData"
    />
    <page-table
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="users"
    ></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PageSearch from "@/components/page-search"
import PageTable from "@/components/page-table"
import { searchFormConfig } from "./config/search.config"
import { tableConfig } from "./config/table.config"
import { userPageSearch } from "@/hooks/use-page-search"

export default defineComponent({
  name: "user",
  components: { PageSearch, PageTable },
  setup() {
    const [pageTableRef, handleResetClick, handleQueryTableData] =
      userPageSearch()
    return {
      pageTableRef,
      searchFormConfig,
      tableConfig,
      handleResetClick,
      handleQueryTableData
    }
  }
})
</script>

<style scoped lang="less"></style>
