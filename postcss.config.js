const baseConfig = require('10up-toolkit/config/postcss.config.js');

module.exports = (props) => {
	const config = baseConfig(props);

	config.plugins['postcss-preset-env'] = {
		...config.plugins['postcss-preset-env'],
		browsers: ['> 0.4% and not dead'],
	};

	return config;
};
