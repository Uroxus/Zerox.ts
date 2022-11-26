/**
 * @file
 * Read all .definition files from ./Commands/ and bulk publish them
 */
import fetchFiles from "../FileFetch.js";
import { Collection } from "oceanic.js";
import { Logger } from "../Logger.js";
import type BotClient from "../../Classes/Client.js";
import type { CreateApplicationCommandOptions } from "oceanic.js";

/**
 * Create an array of application command definitions to publish on shard 0 ready
 * @param Client 
 */
export async function loadApplicationCommands ( Client: BotClient ) {
    const CommandDefinitions = new Collection();

    for await ( const file of fetchFiles( "./Commands/" ) ) {
        if ( file.includes( ".definition" ) ) {
            const { "default": CommandDefinition } = await import( file );
            //TODO: Handle the scenario where a .definition file is an array of various definitions and not a single structure object

            const cacheKey = definitionCacheKey( CommandDefinition );

            if ( !CommandDefinitions.has( cacheKey ) ) {
                CommandDefinitions.set( cacheKey, CommandDefinition );
            } else {
                Logger.error( `Duplicate Application command definition name ${ cacheKey }`, { source: "Loaders/ApplicationCommands.js" } );
            }
        }
    }
    Client.application.bulkEditGlobalCommands( CommandDefinitions.toArray() as CreateApplicationCommandOptions[] ).catch( ( error ) => {
        Logger.error( `Failed to bulk edit Global commands`, { source: "Loaders/ApplicationCommands.js", error: error } );
    } );
}

function definitionCacheKey ( CommandDefinition: CreateApplicationCommandOptions ) {
    return `${ CommandDefinition.name }-${ CommandDefinition.type }`;
}