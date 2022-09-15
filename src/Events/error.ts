import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import { shardErrorCount } from "../Prometheus/Metrics/Shard.js";

export default class Error extends Event {
    constructor() {
        super( "error" );
    }

    public invoke ( Client: BotClient, info: string | Error, shardId: number | undefined ): void {
        shardErrorCount.inc( { shardId, errorMessage: info[ "message" ] || info } );
        console.error( `Shard ${ shardId } | ${ info }` );
    }
}