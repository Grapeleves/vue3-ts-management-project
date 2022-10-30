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
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    ></page-table>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigCom"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

import PageSearch from "@/components/page-search"
import PageTable from "@/components/page-table"
import pageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { tableConfig } from "./config/table.config"
import { modalConfig } from "./config/modal.config"

import { userPageSearch } from "@/hooks/use-page-search"
import { usePageModal } from "@/hooks/use-page-modal"
import { useStore } from "vuex"

export default defineComponent({
  name: "user",
  components: { PageSearch, PageTable, pageModal },
  setup() {
    // pageSearch
    const [pageTableRef, handleResetClick, handleQueryTableData] =
      userPageSearch()

    // pageModal
    // 新增回调-处理密码项的显示
    const addCallback = () => {
      const passItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      passItem!.isHidden = false
    }
    // 编辑回调-处理密码项的隐藏
    const editCallback = () => {
      const passItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      passItem!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(addCallback, editCallback)

    // 使用computed处理部门、角色获取最新的数据
    const store = useStore()
    const modalConfigCom = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      )
      departmentItem!.options = store.state.entireDepaetment.map(
        (item: any) => {
          return {
            title: item.name,
            value: item.id
          }
        }
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modalConfig
    })

    return {
      searchFormConfig,
      tableConfig,
      modalConfigCom,
      pageTableRef,
      handleResetClick,
      handleQueryTableData,
      pageModalRef,
      defaultInfo,
      handleAddClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less"></style>
