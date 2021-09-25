const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  lintOnSave: false,
  configureWebpack:{
    devtool:'hidden-source-map'
  },
  chainWebpack: config => {
    config
      .plugin('MonacoWebpackPlugin')
      .use(MonacoWebpackPlugin)
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}
