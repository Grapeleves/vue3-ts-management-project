<template>
  <div class="page-modal">
    <el-dialog
      v-model="visible"
      title="提示"
      width="30%"
      center
      destroy-on-close
    >
      <form-group v-bind="modalConfig" v-model="formData"> </form-group>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue"
import FormGroup from "@/baseComponent/form"
import { useStore } from "@/store"

export default defineComponent({
  name: "PageModal",
  components: { FormGroup },
  props: {
    pageName: {
      type: String,
      default: ""
    },
    modalConfig: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    defaultInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    otherInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const visible = ref(false)

    const formData = ref({})

    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (let item of props.modalConfig.formItems) {
          formData.value[item.field] = newVal[item.field]
        }
      }
    )

    const store = useStore()
    const handleConfirmClick = () => {
      visible.value = false

      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch("system/editPageData", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch("system/createPageData", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      visible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style lang="less" scoped></style>
