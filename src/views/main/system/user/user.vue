<template>
  <div class="user">
    <form-group v-bind="searchFormConfig" v-model="formData"></form-group>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import FormGroup from "@/baseComponent/form"
import { searchFormConfig } from "./search/search.config"

export default defineComponent({
  name: "user",
  components: { FormGroup },
  setup() {
    const formData = ref({
      name: "123",
      password: "",
      sports: "basketball",
      timeRange: ""
    })
    return { searchFormConfig, formData }
  }
})
</script>

<style scoped></style>
