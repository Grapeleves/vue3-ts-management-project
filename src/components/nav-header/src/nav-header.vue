<template>
  <div class="nav-header">
    <el-icon class="fold" @click="handleFoldChange">
      <Fold v-show="!isFold" /> <Expand v-show="isFold" />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  emits: ["flodChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit("flodChange", isFold.value)
    }
    return {
      isFold,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.fold {
  font-size: 25px;
  cursor: pointer;
}
</style>
