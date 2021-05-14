const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  transpileDependencies: ["electron", "vuetify"],
  configureWebpack: {
    plugins: [new webpack.ExternalsPlugin("commonjs", ["electron"])]
  }
};
