<template>
  <div class="login-phone">
    <el-form ref="form" label-width="80px" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="login-phone-code">
          <el-input v-model="phone.code"></el-input>
          <el-button class="btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { defineComponent, reactive, ref } from "vue"
import type { FormInstance } from "element-plus"

export default defineComponent({
  setup() {
    const store = useStore()

    const phone = reactive({
      number: "",
      code: ""
    })

    const rules = {
      number: [
        {
          required: true,
          message: "手机号必填",
          trigger: "blur"
        },
        {
          pattern: /^[a-z0-9]{11}$/,
          message: "手机号必须是11位数字",
          trigger: "blur"
        }
      ],
      code: [
        {
          required: true,
          message: "验证码必填",
          trigger: "blur"
        },
        {
          pattern: /^[a-z0-9]{4}$/,
          message: "验证码必须是4数字",
          trigger: "blur"
        }
      ]
    }

    const formRef = ref<FormInstance>()
    const loginAction = () => {
      // 进行登录验证
      store.dispatch("loginModule/phoneLogin", { ...phone })
    }

    return { phone, rules, loginAction }
  }
})
</script>

<style scoped lang="less">
.login-phone-code {
  display: flex;
  .btn {
    margin-left: 8px;
  }
}
</style>
