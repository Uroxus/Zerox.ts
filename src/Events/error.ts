import { Event } from "../Classes/Event.js";
import { Logger } from "../Utilities/Logger.js";
import { shardErrorCount } from "../Prometheus/Metrics/Shard.js";
import type BotClient from "../Classes/Client.js";

export default class Error extends Event {
    constructor() {
        super( "error" );
    }

    public invoke ( Client: BotClient, info: string | Error, shardId: number | undefined ): void {
        shardErrorCount.inc( { shardId, errorMessage: info[ "message" ] || info } );
        Logger.error( `Shard ${ shardId } encountered an error`, { source: "error.js", error: info } );
    }
}