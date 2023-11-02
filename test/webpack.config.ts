import { join } from "path";
import { HotModuleReplacementPlugin, type Configuration } from "webpack";

module.exports = {
  entry: "./src/main.ts",
  output: {
    path: join(__dirname, "dist"),
  },
  target: "node",
  mode: "development",
  plugins: [new HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: [/node_modules/],
      },
    ],
  },
} satisfies Configuration;
