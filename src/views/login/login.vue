<template>
  <div class="login">
    <login-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import loginForm from "./cpns/login-form.vue"

export default defineComponent({
  components: { loginForm },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url("../../assets/img/login-bg.svg");
}
</style>
