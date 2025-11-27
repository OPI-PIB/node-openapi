/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
exports.command = 'serve <command>';
exports.aliases = ['s'];
exports.desc = 'Manage serve commands';
exports.builder = (yargs: any) => yargs.commandDir('serve_cmds');
exports.handler = (argv: any) => {};
