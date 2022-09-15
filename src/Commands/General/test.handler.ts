import { Command } from "../../Classes/Command.js";
import { Message, AnyTextChannel, CommandInteraction, ComponentTypes } from "oceanic.js";
import DeleteParent from "../../Components/DeleteParent.js";

export default class Test extends Command {
    constructor() {
        super( "test" );
    }

    public textCommand ( Message: Message<AnyTextChannel> ): void {
        Message.channel.createMessage( {
            "messageReference": { "messageID": Message.id }, "content": "Test text command reply", "components": [
                {
                    "type": ComponentTypes.ACTION_ROW,
                    "components": [
                        DeleteParent.Definition
                    ]
                }
            ]
        } ).catch( err => {
            console.error( `Failed to respond to Test textCommand: ${ err }` );
        } );
    }

    public slashCommand ( Interaction: CommandInteraction ): void | Promise<void> {
        Interaction.createMessage( {
            "content": "Hello from Slash command", "components": [
                {
                    "type": ComponentTypes.ACTION_ROW,
                    "components": [
                        DeleteParent.Definition
                    ]
                }
            ]
        } );
    }
}