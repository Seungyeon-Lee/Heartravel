const path = require('path')

module.exports = {
  //배포 파일의 위치를 설정 
  devServer: {
    proxy: { //proxyTable 설정
      '/api': {
        target: 'http://localhost:8002/api',
        changeOrigin: true,
        secure:false,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

  },
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ],
  // Paths
  outputDir: './build',

}