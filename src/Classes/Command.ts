import { Logger } from "../Utilities/Logger.js";
import type { AnyTextChannel, CommandInteraction, Message } from "oceanic.js";

export abstract class Command {
    public commandName: string;

    constructor( CommandName: string ) {
        this.commandName = CommandName;
    }

    public slashCommand ( Interaction: CommandInteraction ): void | Promise<void> {
        Logger.debug( `Received Slash command for ${ this.commandName }`, { source: "Command.js" } );
    }

    public textCommand ( Message: Message<AnyTextChannel> ): void | Promise<void> {
        Logger.debug( `Received Text command for ${ this.commandName }`, { source: "Command.js" } );
    }

    public messageContext ( Interaction: CommandInteraction ): void | Promise<void> {
        Logger.debug( `Received Message Context command for ${ this.commandName }`, { source: "Command.js" } );
    }

    public userContext ( Interaction: CommandInteraction ): void | Promise<void> {
        Logger.debug( `Received User Context command for ${ this.commandName }`, { source: "Command.js" } );
    }
}