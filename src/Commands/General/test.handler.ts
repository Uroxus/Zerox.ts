import { Command } from "../../Classes/Command.js";
import type { Message, AnyTextChannel, CommandInteraction } from "oceanic.js";

export default class Test extends Command {
    constructor() {
        super( "test" );
    }

    public textCommand ( Message: Message<AnyTextChannel> ): void {
        Message.channel.createMessage( { "messageReference": { "messageID": Message.id }, "content": "Test text command reply" } ).catch( err => {
            console.error( `Failed to respond to Test textCommand: ${ err }` );
        } );
    }

    public slashCommand ( Interaction: CommandInteraction ): void | Promise<void> {
        Interaction.createMessage( { "content": "Hello from Slash command" } );
    }
}