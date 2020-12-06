const path = require("path");

module.exports = {
  entry: {
    backgroundScript: path.join(__dirname, "src/backgroundScript/index.ts"),
    contentScript: path.join(__dirname, "src/contentScript/index.ts"),
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
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
