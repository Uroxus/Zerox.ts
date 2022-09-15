import fetchFiles from "../FileFetch.js";
import type BotClient from "../../Classes/Client.js";

export async function loadComponents ( Client: BotClient ) {
    for await ( const file of fetchFiles( "./Components/" ) ) {
        const { "default": ComponentFile } = await import( file );

        if ( !Client.ComponentMap.has( ComponentFile.Definition.customID ) ) {
            Client.ComponentMap.set( ComponentFile.Definition.customID, ComponentFile.invoke );
        } else {
            console.error( `Attempted to load duplicate component ${ ComponentFile.Definition.customID } - no changes were made` );
        }
    }
}