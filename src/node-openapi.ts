import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv)).commandDir('cmds').demandCommand().help().argv;
