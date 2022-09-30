import { Client, Collection } from "oceanic.js";
import ClientOptions from "../Constants/ClientOptions.js";
import Database from "./Database.js";
import { loadEvents } from "../Utilities/Loaders/Event.js";
import { loadCommands } from "../Utilities/Loaders/Command.js";
import { loadComponents } from "../Utilities/Loaders/Components.js";
import type { Command } from "./Command.js";
import Environment from "../Constants/Environment.js";

export default class BotClient extends Client {
    public Database: Database;
    public CommandMap: Collection<Command[ "commandName" ], Command>;
    public ComponentMap: Collection<string, Function>;

    constructor() {
        super( ClientOptions );

        this.Database = new Database( process.env.NODE_ENV === Environment.DEV ? process.env.DEV_MONGO_URL : process.env.PROD_MONGO_URL );

        this.CommandMap = new Collection();
        this.ComponentMap = new Collection();

        loadEvents( this );
        loadCommands( this );
        loadComponents( this );
    }
}