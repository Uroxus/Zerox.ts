import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import type { ClientEvents } from "oceanic.js";

export default class ShardResume extends Event {
    constructor() {
        super( "shardResume" );
    }

    public invoke ( Client: BotClient, [ shardId ]: ClientEvents[ "shardResume" ] ): void {
        console.info( `Shard ${ shardId } resumed` );
    }
}