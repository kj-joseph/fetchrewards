const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const build_dir = path.resolve(__dirname, "build");

module.exports = merge.merge(common, {
	plugins: [
		new webpack.DefinePlugin({
			sourceMap: true,
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
	]
});
