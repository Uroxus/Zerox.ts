import { Client, Collection } from "oceanic.js";
import ClientOptions from "../Constants/ClientOptions.js";
import { loadCommands } from "../Utilities/Loaders/Command.js";
import { loadEvents } from "../Utilities/Loaders/Event.js";
import type { Command } from "./Command.js";

export default class BotClient extends Client {
    public CommandMap: Collection<Command[ "commandName" ], Command>;

    constructor() {
        super( ClientOptions );

        this.CommandMap = new Collection();

        loadEvents( this );
        loadCommands( this );
    }
}