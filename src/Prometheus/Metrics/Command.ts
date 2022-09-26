import { Register, AppName } from '../route.js';
import { Counter } from 'prom-client';

export const textCommandCount = new Counter( {
    "name": `${ AppName }_textCommandCount`,
    "help": "The number of times a text command has been used",
    "labelNames": [ "command" ] as const,
    "registers": [ Register ]
} );

export const interactionCommandCount = new Counter( {
    "name": `${ AppName }_interactionCommandCount`,
    "help": "The number of times an interaction command has been used",
    "labelNames": [ "type", "command" ] as const,
    "registers": [ Register ]
} );

export const componentCommandCount = new Counter( {
    "name": `${ AppName }_componentCommandCount`,
    "help": "The number of times a component has been used",
    "labelNames": [ "name" ] as const,
    "registers": [ Register ]
} );