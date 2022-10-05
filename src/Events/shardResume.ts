import { Event } from "../Classes/Event.js";
import { Logger } from "../Utilities/Logger.js";
import { shardResumeCount } from "../Prometheus/Metrics/Shard.js";
import type BotClient from "../Classes/Client.js";

export default class ShardResume extends Event {
    constructor() {
        super( "shardResume" );
    }

    public invoke ( Client: BotClient, shardId: number ): void {
        shardResumeCount.inc( { shardId } );
        Logger.warn( `Shard ${ shardId } resumed`, { source: "shardResume.js" } );
    }
}