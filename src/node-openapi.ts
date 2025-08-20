#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('yargs/yargs')(process.argv.slice(2))
	.commandDir('cmds')
	.demandCommand()
	.exitProcess(false)
	.strict()
	.help()
	.parse();
