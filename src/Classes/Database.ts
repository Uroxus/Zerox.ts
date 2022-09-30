import mongoose from "mongoose";

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
            console.error( `Database failed to connect: ${ error }` );
        }

        mongoose.connection.on( "error", ( error ) => console.error( `Database connection errored: ${ error }` ) );
        mongoose.connection.on( "disconnected", ( error ) => console.error( `Database connection dropped: ${ error }` ) );
        mongoose.connection.on( "connected", () => console.log( "Database connection established" ) );
    }
}