import * as sapper from '@sapper/server';

if (process.env.GCLOUD_PROJECT) { // Available only on Firebase
	module.exports = sapper.middleware;
} else {
	// These dependencies are only used locally
	const sirv = require('sirv');
	const polka = require('polka');
	const compression = require('compression');

	const { PORT, NODE_ENV } = process.env;
	const dev = NODE_ENV === 'development';

	polka() // You can also use Express
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			sapper.middleware()
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});
}
