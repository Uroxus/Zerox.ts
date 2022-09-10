import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";

export default class Error extends Event {
    constructor() {
        super( "error" );
    }

    public invoke ( Client: BotClient, info: string | Error, shardId: number | undefined ): void {
        console.error( `Shard ${ shardId } | ${ info }` );
    }
}