const { merge } = require("webpack-merge");
const coomonConfig = require("./webpack.config.common");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(coomonConfig, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
});
