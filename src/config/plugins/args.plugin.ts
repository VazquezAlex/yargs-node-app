
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(process.argv)
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        description: 'Base for the multiplication table'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        description: 'Limit for the multiplication table'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        description: 'Show the multiplication table'
    })
    .check((argv, options) => {
        if (argv.b < 0) throw 'Error: b must be greater than 0';
        if (argv.l < 0) throw 'Error: l must be greater than 0';

        return true;
    })
    .parseSync();