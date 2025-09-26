const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	webpack.chainWebpack((config) => {
		// Configure sass-loader to use modern API
		config.module
			.rule('scss')
			.use('sass-loader')
			.tap(options => {
				return {
					...options,
					sassOptions: {
						api: 'modern-compiler',
						silenceDeprecations: ['legacy-js-api']
					}
				};
			});

		// Define TNS_ENV global variable
		config.plugin('DefinePlugin').tap(args => {
			const defines = args[0] || {};
			defines.TNS_ENV = JSON.stringify(env.production ? 'production' : 'development');
			return [defines];
		});
	});

	return webpack.resolveConfig();
};
