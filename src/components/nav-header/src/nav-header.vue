<template>
  <div class="nav-header">
    <el-icon class="fold" @click="handleFoldChange">
      <Fold v-show="!isFold" /> <Expand v-show="isFold" />
    </el-icon>
    <div class="content">
      <bread-crumb :breadcrumbs="breadcrumbs"></bread-crumb>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              class="icon"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span>{{ userName }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item divided>用户信息</el-dropdown-item>
              <el-dropdown-item divided>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "@/store"
import { useRoute } from "vue-router"
import BreadCrumb, { Breadcrumb } from "@/baseComponent/breadcrumb"
import { pathMapBreadcrumbs } from "@/utils/map-menus"

export default defineComponent({
  emits: ["flodChange"],
  components: { BreadCrumb },
  setup(props, { emit }) {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)

    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("flodChange", isFold.value)
    }

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    console.log(breadcrumbs)

    return {
      isFold,
      userName,
      breadcrumbs,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .fold {
    font-size: 25px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-left: 8px;
    .user-info {
      cursor: pointer;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
