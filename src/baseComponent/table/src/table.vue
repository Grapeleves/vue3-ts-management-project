<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <template v-for="column in tableColumns" :key="column.prop">
        <el-table-column v-bind="column" align="center">
          <template #default="scope">
            <slot :name="column.slotName" :row="scope.row">
              {{ scope.row[column.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    tableColumns: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ["selection-change"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("selection-change", value)
    }
    return { handleSelectionChange }
  }
})
</script>

<style scoped lang="less"></style>
