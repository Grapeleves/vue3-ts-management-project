<template>
  <div class="user">
    <form-group v-bind="searchFormConfig" v-model="formData" />
    <div class="content">
      <table-list
        :tableData="userList"
        :tableColumns="tableColumnsConfig"
        @selection-change="selectionChange"
      >
        <template #status="scope">
          <el-button>{{
            scope.row.enable === "1" ? "启用" : "禁用"
          }}</el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #handler>
          <div>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </div>
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

    const selectionChange = (value: any) => {
      console.log("1", value)
    }

    return {
      searchFormConfig,
      formData,
      userList,
      tableColumnsConfig,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less">
.content {
  // border: 1px solid black;
}
</style>
