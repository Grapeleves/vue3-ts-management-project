<template>
  <div class="login-form">
    <h1 class="login-form-title">后台管理系统</h1>
    <el-tabs v-model="currentTab" type="border-card" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-form-config">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码？</el-link>
    </div>
    <el-button type="primary" class="login-form-btn" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./login-account.vue"
import LoginPhone from "./login-phone.vue"

export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    const currentTab = ref("account")
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    const handleLogin = () => {
      if (currentTab.value === "account") {
        // 账号登录
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // 手机号登录
        phoneRef.value?.loginAction()
      }
    }
    return {
      currentTab,
      isKeepPassword,
      accountRef,
      phoneRef,
      handleLogin
    }
  }
})
</script>

<style scoped lang="less">
.login-form {
  width: 350px;
  &-title {
    text-align: center;
  }
  &-config {
    display: flex;
    justify-content: space-between;
  }
  &-btn {
    width: 100%;
  }
}
</style>
