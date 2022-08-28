<template>
  <div class="user">
    <form-group v-bind="searchFormConfig"></form-group>

    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import FormGroup from "@/baseComponent/form"
import { searchFormConfig } from "./search/search.config"

export default defineComponent({
  name: "user",
  components: { FormGroup },
  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped></style>
