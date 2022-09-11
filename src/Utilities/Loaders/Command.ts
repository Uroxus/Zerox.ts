import fetchFiles from "../FileFetch.js";
import { CommandMap } from "../../Constants/Maps/Commands.js";
import type { Command } from "../../Classes/Command.js";

export async function loadCommands () {
    for await ( const file of fetchFiles( "./Commands/" ) ) {
        if ( file.includes( ".handler" ) ) {
            const { "default": CommandFile } = await import( file );

            const commandInstance: Command = new CommandFile();

            if ( !CommandMap.has( commandInstance.commandName ) ) {
                CommandMap.set( commandInstance.commandName, commandInstance );
            } else {
                console.error( `Attempted to load duplicate command ${ commandInstance.commandName } - no changes were made` );
            }
        }
    }
}