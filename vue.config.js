const themeConfig = require('./theme.config');

module.exports = {
  pwa: {
    name: 'Pubs Nearby',
    themeColor: themeConfig['@theme-primary'],
    msTileColor: themeConfig['@theme-grey'],
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'green',

    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
    },
    manifestOptions: {
      background_color: themeConfig['@theme-grey'],
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          ...themeConfig,
        },
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    // SVG Loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  },
};
