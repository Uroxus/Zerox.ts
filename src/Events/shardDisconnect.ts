import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";

export default class ShardDisconnect extends Event {
    constructor() {
        super( "shardDisconnect" );
    }

    public invoke ( Client: BotClient, error: Error, shardId: number ): void {
        console.info( `Shard ${ shardId } disconnected: ${ error }` );
    }
}