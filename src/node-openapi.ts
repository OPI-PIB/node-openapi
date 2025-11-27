#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */

require('yargs/yargs')(process.argv.slice(2))
	.commandDir('cmds')
	.demandCommand()
	.exitProcess(false)
	.strict()
	.help()
	.parse();
