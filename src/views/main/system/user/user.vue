<template>
  <div class="user">
    <form-group v-bind="searchFormConfig" v-model="formData" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { useStore } from "vuex"
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

    const store = useStore()
    store.dispatch("system/getPageList", {
      pageUrl: "/users/list",
      pageParams: {
        offset: 0,
        size: 10
      }
    })

    return { searchFormConfig, formData }
  }
})
</script>

<style scoped lang="less">
.content {
  // border: 1px solid black;
}
</style>
