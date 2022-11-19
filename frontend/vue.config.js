const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/styles/global.scss';
        `,
      },
    },
  },
});

// module.exports = {
//   configureWebpack: {
//     devtool: "source-map",
//   },
// };
