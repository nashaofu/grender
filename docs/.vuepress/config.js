const path = require('path')

module.exports = {
  title: 'GRender',
  description: '🛠️ A lightweight canvas library for 2D.',
  base: '/grender/',
  themeConfig: {
    logo: '/logo.svg',
    sidebar: 'auto',
    smoothScroll: true,
    repo: 'nashaofu/grender',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    nav: [
      {
        text: '指南',
        link: '/guide/'
      },
      {
        text: 'API',
        link: '/api/'
      },
      {
        text: '图形',
        link: '/shape/'
      }
    ]
  },
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
    config.resolve.alias.set('grender', path.resolve(__dirname, '../../dist/grender'))
  }
}
