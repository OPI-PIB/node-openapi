/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
exports.command = 'build <command>';
exports.aliases = ['b'];
exports.desc = 'Manage build commands';
exports.builder = (yargs: any) => yargs.commandDir('build_cmds');
exports.handler = (argv: unknown) => {};
