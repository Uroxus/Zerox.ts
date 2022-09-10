import type { CommandInteraction, Message } from "oceanic.js";

export abstract class Command {
    public commandName: string;

    constructor( CommandName: string ) {
        this.commandName = CommandName;
    }

    public slashCommand ( Interaction: CommandInteraction ): void | Promise<void> {
        console.debug( `Received Slash command for ${ this.commandName }` );
    }

    public textCommand ( Message: Message ) {
        console.debug( `Received Text command for ${ this.commandName }` );
    }

    public messageContext ( Interaction: CommandInteraction ) {
        console.debug( `Received Text command for ${ this.commandName }` );
    }

    public userContext ( Interaction: CommandInteraction ) {
        console.debug( `Received Text command for ${ this.commandName }` );
    }
}