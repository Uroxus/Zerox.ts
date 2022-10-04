import mongoose from "mongoose";
import { Logger } from "../Utilities/Logger.js";

export default class Database {
    private url: string;

    constructor( url: string ) {
        this.url = url;

        this.connect();
    }

    async connect () {
        try {
            await mongoose.connect( this.url );
        } catch ( error ) {
            Logger.error( `Database failed to connect`, { source: "Database.js", error: error } );
        }

        mongoose.connection.on( "error", ( error ) => Logger.error( `Database connection errored`, { source: "Database.js", error: error } ) );
        mongoose.connection.on( "disconnected", ( error ) => Logger.error( `Database connection dropped`, { source: "Database.js", error: error } ) );
        mongoose.connection.on( "connected", () => Logger.info( "Database connection established", { source: "Database.js" } ) );
    }
}