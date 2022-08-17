# @opi-pib/node-openapi

## Cli commands

### Display cli documentation

```console
openapi help
```

### Compile openapi.json from docs

```console
openapi build spec --source=./docs/index.json --dist=./dist/openapi.json
```

### Serve documentation in browser

```console
openapi serve editor --port=3010 --host=http://localhost --source=./dist/openapi.json --basePath=/v1
```

### Serve openapi.json

```console
openapi serve spec --port=3011 --host=http://localhost --source=./dist/openapi.json
```

### Build typescript interfaces (needs 'openapi serve spec' command running)

```console
openapi serve spec
openapi build typescript --source=http://localhost:3011 --dist=./src/rest/api --typesOnly=true
```

## Default config

```json
{
	basePath: '/v1',
	host: 'http://localhost',
	port: {
		editor: '3010',
		spec: '3011'
	},
	dist: {
		folder: './dist',
		fileName: 'index'
	},
	sourceUrl: './src/docs/index.json',
	tsModelsUrl: './src/rest/api'
};
```
