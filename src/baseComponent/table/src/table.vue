<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ tableTitle }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      align="center"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          currentPage="currentPage4"
          page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
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
    },
    tableTitle: {
      type: String,
      default: ""
    },
    showSelection: {
      type: Boolean,
      default: false
    },
    showIndex: {
      type: Boolean,
      default: false
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

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    justify-content: flex-end;
  }
}
</style>
