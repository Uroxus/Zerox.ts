import { Event } from "../Classes/Event.js";
import { Logger } from "../Utilities/Logger.js";
import { shardDisconnectCount } from "../Prometheus/Metrics/Shard.js";
import type BotClient from "../Classes/Client.js";

export default class ShardDisconnect extends Event {
    constructor() {
        super( "shardDisconnect" );
    }

    public invoke ( Client: BotClient, error: Error, shardId: number ): void {
        shardDisconnectCount.inc( { shardId, errorMessage: error?.message } );
        Logger.warn( `Shard ${ shardId } disconnected`, { source: "shardDisconnect.js", error: error } );
    }
}