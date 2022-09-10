import fetchFiles from "../FileFetch.js";
import type BotClient from "../../Classes/Client.js";
import type { Event } from "../../Classes/Event.js";
import type { ClientEvents } from "oceanic.js";

export async function loadEvents ( Client: BotClient ) {
    for await ( const file of fetchFiles( "./Events/" ) ) {
        const { "default": EventFile } = await import( file );

        const eventInstance: Event = new EventFile();

        if ( eventInstance.once ) {
            Client.once( eventInstance.name as keyof ClientEvents, ( ...args ) => eventInstance.invoke( Client, ...args ) );
        } else {
            Client.on( eventInstance.name as keyof ClientEvents, ( ...args ) => eventInstance.invoke( Client, ...args ) );
        }
    }
}