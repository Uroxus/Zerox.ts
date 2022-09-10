import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import type { ClientEvents } from "oceanic.js";

export default class ShardReady extends Event {
    constructor() {
        super( "shardReady" );
    }

    public invoke ( Client: BotClient, [ shardId ]: ClientEvents[ "shardReady" ] ): void {
        console.info( `Shard ${ shardId } ready` );
    }
}