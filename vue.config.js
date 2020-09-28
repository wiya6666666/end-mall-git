module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    devServer: { // 设置代理
      host: '192.168.1.5', //ip地址
      port: 8085, //端口
    },
  }
}