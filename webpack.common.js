const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    backgroundScript: path.join(__dirname, "src/backgroundScript/index.ts"),
    contentScript: path.join(__dirname, "src/contentScript/index.ts"),
    settings: path.join(__dirname, "src/settings/index.tsx"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.VERSION": JSON.stringify(require("./package.json").version),
    }),
  ],
};
