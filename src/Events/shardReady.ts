import { Event } from "../Classes/Event.js";
import { shardReadyCount } from "../Prometheus/Metrics/Shard.js";
import type BotClient from "../Classes/Client.js";

export default class ShardReady extends Event {
    constructor() {
        super( "shardReady" );
    }

    public invoke ( Client: BotClient, shardId: number ): void {
        shardReadyCount.inc( { shardId } );
        console.info( `Shard ${ shardId } ready` );
    }
}