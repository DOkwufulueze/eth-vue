module.exports = {
  configureWebpack: {
    devtool: "cheap-source-map",
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false
        }
      }
    }
  },
  devServer: {
    // hot reload
    hotOnly: true,

    // open default browser
    open: false,

    // server port
    port: 3001
  },
  lintOnSave: false,
  outputDir: "dist",
  pages: {
    index: {
      // entry point to eth-vue application
      entry: "src/main.js",

      // html file to use as template when serving or building
      template: "index.html",

      // file to distribute from build for production (in the dist directory)
      filename: "index.html"
    }
  },
  pwa: {
    name: "eth-vue-icons",
    iconPaths: {
      appleTouchIcon: "./static/images/danielokwufulueze.png",
      favicon16: "./static/images/danielokwufulueze.png",
      favicon32: "./static/images/danielokwufulueze.png",
      maskIcon: "./static/images/danielokwufulueze.png",
      msTileImage: "./static/images/danielokwufulueze.png"
    }
  }
};
