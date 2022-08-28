<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import type { Breadcrumb } from "../types"

export default defineComponent({
  name: "breadcrumb",
  props: {
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.nav-breadcrumb {
  display: flex;
  align-items: center;
}
</style>
