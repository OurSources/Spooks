const path = require("path");
const fs = require("fs-extra");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	mode: "development",
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env"]
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "css-loader",
						options: {
							root: "..",
							minimize: true,
							importLoaders: 1
						}
					},
					"postcss-loader"
				]
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "img/",
							publicPath: "img/"
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			minify: false,
			template: "src/index.ejs"
		})
	]
};

module.exports = async function(env) {
	await fs.remove(config.output.path);
	
	return config;
};
