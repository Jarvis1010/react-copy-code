var path = require("path");
var nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "react-copy-code",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true,
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties",
              "transform-react-jsx",
            ],
          },
        },
      },
    ],
  },
  externals: [nodeExternals()],
};
