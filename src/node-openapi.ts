#!/usr/bin/env node

// eslint-disable-next-line no-unused-expressions
require('yargs').commandDir('cmds').demandCommand().help().argv;
