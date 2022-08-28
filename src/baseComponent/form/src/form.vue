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
            >
              <!-- input输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <!-- select选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
                  :placeholder="item.placeholder"
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
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer">
        <div class="btns">
          <el-button>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </slot>
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
      default: () => {
        return {}
      }
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // 双向绑定
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue)
      },
      {
        deep: true
      }
    )

    return { formData }
  }
})
</script>

<style scoped lang="less">
.form-page {
  padding: 0 10px;
  .form {
    padding-top: 22px;
  }
  .footer {
    .btns {
      text-align: right;
      padding-bottom: 10px;
    }
  }
}
</style>
