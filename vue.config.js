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
    name: "eth-vue",
    iconPaths: {
      appleTouchIcon: "static/images/apple-touch-icon.png",
      favicon16: "static/images/favicon-16x16.png",
      favicon32: "static/images/favicon-32x32.png",
      maskIcon: "./static/images/danielokwufulueze.png",
      msTileImage: "static/images/mstile-150x150.png"
    },
    manifestOptions: {
      Scope: "/",
      start_url: "/",
      icons: [
        {
          src: "static/images/favicon.ico",
          sizes: "64x64 32x32 24x24 16x16",
          type: "image/x-icon"
        }
      ]
    }
  }
};
