const { merge } = require("webpack-merge");
const coomonConfig = require("./webpack.config.common");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge(coomonConfig, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		port: 3000,
		hot: true,
		open: true,
	},
	plugins: [
		new ESLintPlugin({
			extensions: ["js", "jsx", "ts", "tsx"],
			emitWarning: true,
			failOnError: false,
		}),
	],
});
