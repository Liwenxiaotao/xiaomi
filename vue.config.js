module.exports = {
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:'http://mall-pre.springboot.cn',
        changeOrigin:true,
        pathRewrite:{
          '/api':''
        }
      }
    }
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap:false,
  // 禁止预加载
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch');
  }
}