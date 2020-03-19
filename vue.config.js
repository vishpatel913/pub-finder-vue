const themeConfig = require('./theme.config');

module.exports = {
  pwa: {
    name: 'Pubs Nearby',
    themeColor: themeConfig['@theme-primary'],
    backgroundColor: themeConfig['@theme-grey'],
    msTileColor: themeConfig['@theme-grey'],
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'green',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
    },
    manifestPath: 'manifest.json',
    manifestOptions: {
      icons: [
        {
          src: 'img/icons/android-chrome-maskable-192x192',
          sizes: '196x196',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'img/icons/android-chrome-maskable-152x152.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
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
