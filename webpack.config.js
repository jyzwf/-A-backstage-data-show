var webpack = require('webpack'),
	path = require('path');

module.exports = {
	entry:{
		index:'./src/js/index.js',
		history:'./src/js/history.js',
		login:'./src/js/login.js',
		particles:'./src/js/particles.js'
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'./js/[name].js',
		publicPath:'/dist'
	},
	module:{
		loaders:[
			{test:/\.js$/,loader:'babel',exclude:/node_modules/},
			{test:/\.jade$/,loader:'jade'},
			{test:/\.scss$/,loader:'style!css!autoprefixer!sass'},
			{test:/\.css$/,loader:'style!css!autoprefixer!sass'},
			{
                // edit this for additional asset file types
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file?name=imgs/[name].[ext]'
            }
		]
	},
	babel:{
		presets:['es2015']
	},
	resolve:{
		extensions:['','.js','.scss','.css'],
		alias:{
			'jquery':path.join(__dirname, "./src/assets/libs/jquery.min.js"),
			'dateRange':path.join(__dirname, "./src/assets/libs/dateRange.js")
		}
	}
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}