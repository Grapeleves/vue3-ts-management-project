<template>
  <div>
    <form-group v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <p>高级检索</p>
      </template>
      <template #footer>
        <div class="search-btns">
          <el-button @click="resetFormData">重置</el-button>
          <el-button type="primary" @click="queryTableData">搜索</el-button>
        </div>
      </template>
    </form-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import FormGroup from "@/baseComponent/form"

export default defineComponent({
  name: "PageSearch",
  components: { FormGroup },
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  emits: ["resetFormData", "queryTableData"],
  setup(props, { emit }) {
    // formData对象的属性有searchFormConfig种formItems来动态决定
    const formItems = props.searchFormConfig.formItems || []
    const formOriginData: any = {}
    for (let key of formItems) {
      formOriginData[key.field] = ""
    }
    const formData = ref(formOriginData)

    // 重置
    const resetFormData = () => {
      formData.value = formOriginData
      emit("resetFormData")
    }

    // 搜索
    const queryTableData = () => {
      console.log("搜索数据")
      emit("queryTableData", formData.value)
    }
    return {
      formData,
      resetFormData,
      queryTableData
    }
  }
})
</script>

<style scoped lang="less">
.search-btns {
  text-align: right;
  padding-bottom: 10px;
}
</style>
