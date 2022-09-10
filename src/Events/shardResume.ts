import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";

export default class ShardResume extends Event {
    constructor() {
        super( "shardResume" );
    }

    public invoke ( Client: BotClient, shardId: number ): void {
        console.info( `Shard ${ shardId } resumed` );
    }
}