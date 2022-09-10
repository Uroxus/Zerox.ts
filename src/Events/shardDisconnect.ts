import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import type { ClientEvents } from "oceanic.js";

export default class ShardDisconnect extends Event {
    constructor() {
        super( "shardDisconnect" );
    }

    public invoke ( Client: BotClient, [ error, shardId ]: ClientEvents[ "shardDisconnect" ] ): void {
        console.info( `Shard ${ shardId } disconnected: ${ error }` );
    }
}