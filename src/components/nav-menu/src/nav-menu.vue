<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span class="title" v-show="!collapse">Vue3+TS</span>
    </div>
    <div>
      <el-menu
        :default-active="defaultVal"
        :collapse="collapse"
        :unique-opened="true"
        class="el-menu-vertical"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="ele in item.children" :key="ele.id">
              <el-menu-item-group>
                <el-menu-item
                  :index="ele.id"
                  @click="handleMenuItemClick(ele)"
                  >{{ ele.name }}</el-menu-item
                >
              </el-menu-item-group>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { useStore } from "@/store"
import { useRouter, useRoute } from "vue-router"
import { pathMapToMenu } from "@/utils/map-menus"

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    const router = useRouter()
    const handleMenuItemClick = (menu: any) => {
      // console.log(menu.url)
      router.push({
        path: menu.url ?? "/not-found"
      })
    }

    const route = useRoute()
    const currentPath = route.path
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultVal = ref(menu.id)

    return { userMenus, defaultVal, handleMenuItemClick }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
