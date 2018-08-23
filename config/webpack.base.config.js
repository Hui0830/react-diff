const path = require('path');

// 入口文件对象
let config = {
	entry: {
		index: path.resolve(__dirname,'../src/index.js'),
		},
	/*------------提取公共代码-----------*/
	optimization: {
		/*--包清单--*/
		runtimeChunk: {
			name: 'manifest'
		},

		/*--拆分公共代码--*/
		splitChunks: {
			cacheGroups: {
				//项目公共组件提取
				/*common: {
					chunks: "initial",
					name: "common",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0
				},*/
				//第三方组件提取
				styles: {
				          name: 'styles',
				          test: /\.scss$/,
				          chunks: 'all',
				          enforce: true
				        },
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
};
 module.exports = config