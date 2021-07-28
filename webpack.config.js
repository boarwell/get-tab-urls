import { resolve } from "path";

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",

  entry: {
    "popup/main": "./src/ts/popup/main.ts",
  },

  output: {
    path: resolve("build"),
    filename: "[name].js",
  },

  // to prevent a error caused by eval()
  devtool: false,

  module: {
    rules: [
      {
        test: /.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
