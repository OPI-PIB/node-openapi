export const config = {
	basePath: '/v1',
	host: 'http://localhost',
	port: {
		editor: '3010',
		spec: '3011',
	},
	dist: {
		folder: './dist',
		fileName: 'index',
	},
	sourceUrl: './src/docs/index.json',
	typescript: {
		dist: './src/rest/api',
		typesOnly: true,
	},
};
