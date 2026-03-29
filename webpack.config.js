const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = async (env, options) => {
  const isDev = options.mode === "development";
  let httpsOptions = {};
  if (isDev) {
    const devCerts = require("office-addin-dev-certs");
    httpsOptions = await devCerts.getHttpsServerOptions();
  }
  return {
    devtool: "source-map",
    entry: { taskpane: "./src/taskpane/taskpane.js" },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
      clean: true,
    },
    resolve: { extensions: [".html", ".js"] },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
        template: "./src/taskpane/taskpane.html",
        chunks: ["taskpane"],
      }),
      new CopyWebpackPlugin({ patterns: [{ from: "manifest.xml", to: "manifest.xml" }] }),
    ],
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
      server: { type: "https", options: httpsOptions },
      port: 3000,
    },
  };
};
