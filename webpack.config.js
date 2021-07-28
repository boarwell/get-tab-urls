import { resolve } from "path";

/** @type {import('webpack').Configuration} */
const config = {
  mode: "development",

  entry: {
    popup: "./src/ts/pages/popup.ts",
  },

  output: {
    path: resolve("build"),
    filename: "[name]/main.js",
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
