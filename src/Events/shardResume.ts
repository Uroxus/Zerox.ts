import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import { shardResumeCount } from "../Prometheus/Metrics/Shard.js";

export default class ShardResume extends Event {
    constructor() {
        super( "shardResume" );
    }

    public invoke ( Client: BotClient, shardId: number ): void {
        shardResumeCount.inc( { shardId } );
        console.info( `Shard ${ shardId } resumed` );
    }
}