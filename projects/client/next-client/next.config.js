module.exports = {
	webpack: (config, options) => {
		config.module.rules.push({
			test: /.*\.svgi$/i,
			use: [
				{
					loader: 'svg-inline-loader'
				}
			]
		});

		return config;
	},
	env: {
		API_KEY: 'This is a super secret development API Key that is not available on the client.',
		NEXT_PUBLIC___SYS_BACKEND_HOST_URI__: 'localhost:4000'
	}
};
