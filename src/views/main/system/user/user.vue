<template>
  <div class="user">
    <form-group v-bind="searchFormConfig" v-model="formData" />
    <div class="content">
      <table-list :tableData="userList" :tableColumns="tableColumnsConfig">
        <template #status="scope">
          <el-button>{{
            scope.row.enable === "1" ? "启用" : "禁用"
          }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </table-list>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue"
import { useStore } from "vuex"
import FormGroup from "@/baseComponent/form"
import TableList from "@/baseComponent/table"
import { searchFormConfig } from "./config/search.config"
import { tableColumnsConfig } from "./config/table.config"

export default defineComponent({
  name: "user",
  components: { FormGroup, TableList },
  setup() {
    const formData = ref({
      name: "123",
      password: "",
      sports: "basketball",
      timeRange: ""
    })

    const store = useStore()
    store.dispatch("system/getPageList", {
      pageUrl: "/users/list",
      pageParams: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    return { searchFormConfig, formData, userList, tableColumnsConfig }
  }
})
</script>

<style scoped lang="less">
.content {
  // border: 1px solid black;
}
</style>
