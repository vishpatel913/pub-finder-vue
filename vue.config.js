const themeConfig = require('./theme.config');

module.exports = {
  pwa: {
    name: 'Pubs Nearby',
    themeColor: themeConfig['primary-color'],
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
};
