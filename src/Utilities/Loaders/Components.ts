/**
 * @file
 * Load and cache all Component definitions in ./Components/ by their customID value
 */

import fetchFiles from "../FileFetch.js";
import { Logger } from "../Logger.js";
import type BotClient from "../../Classes/Client.js";

/**
 * Cache all of the common components by customID value
 * @param Client 
 */
export async function loadComponents ( Client: BotClient ) {
    for await ( const file of fetchFiles( "./Components/" ) ) {
        const { "default": ComponentFile } = await import( file );

        if ( !Client.ComponentMap.has( ComponentFile.customID ) ) {
            Client.ComponentMap.set( ComponentFile.customID, ComponentFile.invoke );
        } else {
            Logger.error( `Attempted to load duplicate component ${ ComponentFile.Definition.customID } - no changes were made`, { source: "Loaders/Components.js" } );
        }
    }
}