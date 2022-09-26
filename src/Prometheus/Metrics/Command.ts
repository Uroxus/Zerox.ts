import { Register, AppName } from '../route.js';
import { Counter } from 'prom-client';

export const textCommandCount = new Counter( {
    "name": `${ AppName }_textCommandCount`,
    "help": "The number of times each text command has been used",
    "labelNames": [ "command" ] as const,
    "registers": [ Register ]
} );