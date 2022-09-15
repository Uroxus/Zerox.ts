import fetchFiles from "../FileFetch.js";
import type { Command } from "../../Classes/Command.js";
import type BotClient from "../../Classes/Client.js";

export async function loadCommands ( Client: BotClient ) {
    for await ( const file of fetchFiles( "./Commands/" ) ) {
        if ( file.includes( ".handler" ) ) {
            const { "default": CommandFile } = await import( file );

            const commandInstance: Command = new CommandFile();

            if ( !Client.CommandMap.has( commandInstance.commandName ) ) {
                Client.CommandMap.set( commandInstance.commandName, commandInstance );
            } else {
                console.error( `Attempted to load duplicate command ${ commandInstance.commandName } - no changes were made` );
            }
        }
    }
}