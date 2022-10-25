<template>
  <div class="content">
    <table-list
      :tableData="userList"
      :dataCount="dataCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
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

      <!-- 动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"> </slot>
      </template>
    </table-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from "vue"
import { useStore } from "vuex"
import TableList from "@/baseComponent/table"

export default defineComponent({
  name: "PageTable",
  components: { TableList },
  props: {
    tableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const store = useStore()

    // 分页数据
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      getPageData()
    })

    // 获取用户列表数据
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("system/getPageList", {
        pageName: props.pageName,
        pageParams: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从vuex中获取数据
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 获取其他的动态插槽名称
    const otherPropSlots = props.tableConfig?.tableColumns.filter(
      (item: any) => {
        if (item.slotName) {
          if (item.slotName === "status") return false
          if (item.slotName === "createAt") return false
          if (item.slotName === "updateAt") return false
          if (item.slotName === "handler") return false
          return true
        }
      }
    )

    // 表格多选
    const selectionChange = (value: any) => {
      console.log("1", value)
    }

    return {
      pageInfo,
      userList,
      dataCount,
      otherPropSlots,
      getPageData,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less"></style>