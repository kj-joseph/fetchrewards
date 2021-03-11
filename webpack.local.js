const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const build_dir = path.resolve(__dirname, "build");

module.exports = merge.merge(common, {
	devServer: {
		contentBase: build_dir,
		disableHostCheck: true,
		historyApiFallback: true,
		inline: true,
		open: false,
		host: "0.0.0.0"
	}
});
