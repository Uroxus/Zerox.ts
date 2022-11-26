/**
 * @file
 * Load all .handler files from ./Commands/ and cache the defined commandName
 */

import fetchFiles from "../FileFetch.js";
import { Logger } from "../Logger.js";
import type { Command } from "../../Classes/Command.js";
import type BotClient from "../../Classes/Client.js";

/**
 * Cache the command handler commandNames which hopefully match up with an active application command definition
 * @param Client 
 */
export async function loadCommands ( Client: BotClient ) {
    for await ( const file of fetchFiles( "./Commands/" ) ) {
        if ( file.includes( ".handler" ) ) {
            const { "default": CommandFile } = await import( file );

            const commandInstance: Command = new CommandFile();

            if ( !Client.CommandMap.has( commandInstance.commandName ) ) {
                Client.CommandMap.set( commandInstance.commandName, commandInstance );
            } else {
                Logger.error( `Attempted to load duplicate command ${ commandInstance.commandName } - no changes were made` );
            }
        }
    }
}