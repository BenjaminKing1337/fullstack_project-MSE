const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/styles/global.scss';
        `,
      },
    },
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
});
