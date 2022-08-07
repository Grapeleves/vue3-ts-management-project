<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="80px" :model="account" :rules="rules">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { useStore } from "vuex"
import localCatch from "@/utils/catch"
import type { FormInstance } from "element-plus"

export default defineComponent({
  name: "LoginAccount",
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCatch.getCache("name") ?? "",
      password: localCatch.getCache("password") ?? ""
    })

    const formRef = ref<FormInstance>()

    const rules = {
      name: [
        {
          required: true,
          message: "账号必填",
          trigger: "blur"
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: "账号必须是5-10个字母或数字",
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,
          message: "密码必填",
          trigger: "blur"
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: "密码必须是3位以上的字母或数字",
          trigger: "blur"
        }
      ]
    }

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 记住密码
          if (isKeepPassword) {
            localCatch.setCache("name", account.name)
            localCatch.setCache("password", account.password)
          } else {
            localCatch.deleteCatchCache("name")
            localCatch.deleteCatchCache("password")
          }

          // 进行登录验证
          store.dispatch("login/accountLogin", { ...account })
        }
      })
    }

    return { account, formRef, rules, loginAction }
  }
})
</script>

<style scoped lang="less"></style>
