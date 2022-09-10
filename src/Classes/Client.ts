import { Client } from "oceanic.js";
import ClientOptions from "../Constants/ClientOptions.js";
import { loadEvents } from "../Utilities/Loaders/Event.js";

export default class BotClient extends Client {
    constructor() {
        super( ClientOptions );

        loadEvents( this );
    }
}