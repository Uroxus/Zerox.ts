import { Message, AnyTextChannel } from "oceanic.js";
import { Command } from "../../Classes/Command.js";

export default class Test extends Command {
    constructor() {
        super( "test" );
    }

    public textCommand ( Message: Message<AnyTextChannel> ): void {
        Message.channel.createMessage( { "messageReference": { "messageID": Message.id }, "content": "Test text command reply" } ).catch( err => {
            console.error( `Failed to respond to Test textCommand: ${ err }` );
        } );
    }
}