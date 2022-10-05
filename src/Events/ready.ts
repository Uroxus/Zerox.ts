import { Event } from "../Classes/Event.js";
import { loadApplicationCommands } from "../Utilities/Loaders/ApplicationCommands.js";
import { manageListings } from "../Utilities/Listings.js";
import { Logger } from "../Utilities/Logger.js";
import type BotClient from "../Classes/Client.js";

export default class Ready extends Event {
    constructor() {
        super( "ready", true );
    }

    public invoke ( Client: BotClient ): void {
        Logger.info( "All shards turned ready", { source: "ready.js" } );
        loadApplicationCommands( Client );
        manageListings( Client );
    }
}