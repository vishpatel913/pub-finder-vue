const themeConfig = require('./theme.config');

module.exports = {
  pwa: {
    name: 'Pubs Nearby',
    themeColor: themeConfig['theme-primary'],
    backgroundColor: themeConfig['theme-beige'],
    msTileColor: themeConfig['theme-grey'],
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'green',

    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
    },
    manifestPath: 'manifest.json',
    manifestOptions: {},
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
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
  },
};
