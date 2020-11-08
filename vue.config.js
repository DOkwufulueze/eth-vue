module.exports = {
  devServer: {
    // hot reload
    hotOnly: true,

    // open default browser
    open: true,

    // server port
    port: 3001
  },
  configureWebpack: {
    devtool: "cheap-source-map"
  }
};
