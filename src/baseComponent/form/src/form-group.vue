<template>
  <div class="form-page">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form class="form" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.value">
          <el-col v-bind="layout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- input输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :model-value="modelValue[item.field]"
                  @update:model-value="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <!-- select选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  :placeholder="item.placeholder"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- datepicter日期选择器 -->
              <template v-else-if="item.type === 'datepicter'">
                <el-date-picker
                  :model-value="modelValue[item.field]"
                  v-bind="item.otherOptions"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import type { IFormItem } from "../type"

export default defineComponent({
  props: {
    layout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    modelValue: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 双向绑定
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit("update:modelValue", newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )

    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value })
    }

    return { handleValueChange }
  }
})
</script>

<style scoped lang="less">
.form-page {
  padding: 0 10px;
  .form {
    padding-top: 22px;
  }
}
</style>
