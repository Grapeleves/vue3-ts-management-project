<template>
  <div class="content">
    <table-list
      :tableData="userList"
      v-bind="tableConfig"
      @selection-change="selectionChange"
    >
      <!-- 头部插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="addUser">新建用户</el-button>
        <el-icon><RefreshRight /></el-icon>
      </template>

      <!-- 列的插槽 -->
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable === "1" ? "启用" : "禁用" }}</el-button
        >
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
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"
import TableList from "@/baseComponent/table"

export default defineComponent({
  naem: "PageTable",
  components: { TableList },
  props: {
    tableConfig: {
      type: Array,
      default: () => []
    },
    pageName: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // 获取用户列表数据
    const store = useStore()
    store.dispatch("system/getPageList", {
      pageName: props.pageName,
      pageParams: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // const userCount = computed(() => store.state.system.userCount)

    // 多选
    const selectionChange = (value: any) => {
      console.log("1", value)
    }
    return {
      userList,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less"></style>
