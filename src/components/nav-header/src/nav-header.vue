<template>
  <div class="nav-header">
    <el-icon class="fold" @click="handleFoldChange">
      <Fold v-show="!isFold" /> <Expand v-show="isFold" />
    </el-icon>
    <div class="content">
      <div>面包屑</div>
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

export default defineComponent({
  emits: ["flodChange"],
  setup(props, { emit }) {
    const store = useStore()
    const userName = computed(() => store.state.login.userInfo.name)
    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("flodChange", isFold.value)
    }
    return {
      isFold,
      userName,
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
