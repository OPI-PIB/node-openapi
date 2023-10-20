exports.command = 'build <command>';
exports.aliases = ['b'];
exports.desc = 'Manage build commands';
exports.builder = (yargs: any) => yargs.commandDir('build_cmds');
// eslint-disable-next-line no-unused-vars
exports.handler = (argv: any) => {};
