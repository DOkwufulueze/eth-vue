module.exports = {
  devServer: {
    // hot reload
    hotOnly: true,

    // open default browser
    open: false,

    // server port
    port: 3001
  },
  configureWebpack: {
    devtool: "cheap-source-map"
  }
};
