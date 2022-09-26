import { Register, AppName } from '../route.js';
import { Counter } from 'prom-client';

export const shardReadyCount = new Counter( {
    "name": `${ AppName }_shardReadyCount`,
    "help": "The number of times shards have turned ready",
    "labelNames": [ "shardId" ] as const,
    "registers": [ Register ]
} );

export const shardResumeCount = new Counter( {
    "name": `${ AppName }_shardResumeCount`,
    "help": "The number of times shards have resumed",
    "labelNames": [ "shardId" ] as const,
    "registers": [ Register ]
} );

export const shardDisconnectCount = new Counter( {
    "name": `${ AppName }_shardDisconnectCount`,
    "help": "The number of times shards have disconnected",
    "labelNames": [ "shardId", "errorMessage" ] as const,
    "registers": [ Register ]
} );

export const shardErrorCount = new Counter( {
    "name": `${ AppName }_shardError`,
    "help": "The number of times shards have encountered an error",
    "labelNames": [ "shardId", "errorMessage" ] as const,
    "registers": [ Register ]
} );