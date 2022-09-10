import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";
import type { ClientEvents } from "oceanic.js";

export default class Error extends Event {
    constructor() {
        super( "error" );
    }

    public invoke ( Client: BotClient, [ info, shardId ]: ClientEvents[ "error" ] ): void {
        console.error( `Shard ${ shardId } | ${ info }` );
    }
}