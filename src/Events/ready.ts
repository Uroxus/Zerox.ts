import { Event } from "../Classes/Event.js";
import type BotClient from "../Classes/Client.js";

export default class Ready extends Event {
    constructor() {
        super( "ready" );
    }

    public invoke (): void {
        console.info( "All shards turned ready" );
    }
}