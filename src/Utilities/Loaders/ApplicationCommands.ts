import fetchFiles from "../FileFetch.js";
import { Collection, CreateApplicationCommandOptions, RESTManager } from "oceanic.js";
import type BotClient from "../../Classes/Client.js";

export async function loadApplicationCommands ( Client: BotClient ) {
    const CommandDefinitions = new Collection();

    for await ( const file of fetchFiles( "./Commands/" ) ) {
        if ( file.includes( ".definition" ) ) {
            const { "default": CommandDefinition } = await import( file );
            //TODO: Handle the scenario where a .definition file is an array of various definitions and not a single structure object

            const cacheKey = definitionCacheKey( CommandDefinition );

            if ( !CommandDefinitions.has( cacheKey ) ) {
                console.log( cacheKey );
                CommandDefinitions.set( cacheKey, CommandDefinition );
            } else {
                console.error( `Duplicate Application command definition name ${ cacheKey }` );
            }
        }
    }
    Client.application.bulkEditGlobalCommands( CommandDefinitions.toArray() as CreateApplicationCommandOptions[] ).catch( err => {
        console.error( `Failed to bulk edit Global commands: ${ err }` );
    } );
}

function definitionCacheKey ( CommandDefinition: CreateApplicationCommandOptions ) {
    return `${ CommandDefinition.name }-${ CommandDefinition.type }`;
}