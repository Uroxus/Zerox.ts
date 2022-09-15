import { Event } from "../Classes/Event.js";
import { loadApplicationCommands } from "../Utilities/Loaders/ApplicationCommands.js";
import type BotClient from "../Classes/Client.js";

export default class Ready extends Event {
    constructor() {
        super( "ready", true );
    }

    public invoke ( Client: BotClient ): void {
        console.info( "All shards turned ready" );
        loadApplicationCommands( Client );
    }
}