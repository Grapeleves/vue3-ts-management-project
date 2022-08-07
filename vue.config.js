const path = require("path")
module.exports = {
  // 1、配置方式一：使用cli提供的属性
  outputDir: "./build",
  // 2、配置方式二：和webpack的属性完全一致 最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components"
      }
    }
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     // 覆盖
  //     "@": path.resolve(__dirname, "src"),
  //     components: "@/components"
  //   }
  // },
  // 3、配置方式三：链式配置
  // configureWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("components", "@/components")
  // }
  // 3、devServe
  devServer: {
    proxy: {
      "^api": {
        target: "http://152.136.185.210:5000",
        pathRewrite: {
          "^api": ""
        },
        changeOrigin: true
      }
    }
  }
}
