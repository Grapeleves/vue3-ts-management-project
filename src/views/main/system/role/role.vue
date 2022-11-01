<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-table
      ref="pageTableRef"
      pageName="role"
      :tableConfig="tableConfig"
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
    ></page-table>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="treeRef"
        show-checkbox
        node-key="id"
        :data="menuData"
        :props="{ children: 'children', label: 'name' }"
        @check="handleTreeCheck"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue"
import { useStore } from "@/store"

import { ElTree } from "element-plus"
import PageSearch from "@/components/page-search"
import PageTable from "@/components/page-table"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { tableConfig } from "./config/table.config"
import { modalConfig } from "./config/modal.config"

import { usePageModal } from "@/hooks/use-page-modal"
import { getMenuLeafKeys } from "@/utils/map-menus"

export default defineComponent({
  name: "role",
  components: { PageSearch, PageTable, PageModal },
  setup() {
    // 处理角色树的反显
    const treeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (row: any) => {
      const leafKeys = getMenuLeafKeys(row.menuList)
      nextTick(() => {
        treeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleAddClick, handleEditClick] =
      usePageModal(undefined, editCallback)

    const store = useStore()
    const menuData = computed(() => {
      return store.state.entireMenu
    })

    const otherInfo = ref({})

    const handleTreeCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      tableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      menuData,
      otherInfo,
      treeRef,
      handleAddClick,
      handleEditClick,
      handleTreeCheck
    }
  }
})
</script>

<style scoped></style>
