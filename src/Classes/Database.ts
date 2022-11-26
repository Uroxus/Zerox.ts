import mongoose, { connect } from "mongoose";
import { Logger } from "../Utilities/Logger.js";

export default class Database {
    private connection = mongoose.connection;

    constructor() {
        this.connection
            .on( "open", () => Logger.info( `Database connection established`, { source: "Database.js" } ) )
            .on( "disconnected", ( error ) => Logger.error( `Database connection dropped`, { source: "Database.js", error: error } ) )
            .on( "error", ( error ) => Logger.error( `Database connection errored`, { source: "Database.js", error: error } ) );
    }

    async connect ( url: string ) {
        Logger.debug( url );

        try {
            await connect( url );
        } catch ( error ) {
            Logger.error( `Database failed to connect`, { source: "Database.js", error: error } );
        }
    }
}