import { Event } from "../Classes/Event.js";
import EmbedBuilder from "../Classes/EmbedBuilder.js";
import { ChannelTypes } from "oceanic.js";
import { Logger } from "../Utilities/Logger.js";
import { textCommandCount } from "../Prometheus/Metrics/Command.js";
import type BotClient from "../Classes/Client.js";
import type { AnyTextChannel, Message } from "oceanic.js";

export default class MessageCreate extends Event {
    constructor() {
        super( "messageCreate" );
    }

    public invoke ( Client: BotClient, Message: Message<AnyTextChannel> ): void {
        if ( Message.channel.type !== ChannelTypes.GUILD_TEXT ) return;
        if ( Message.author.bot ) return;

        const prefix = Message.content.trim().match( /^<@!?[0-9]*>/gm );
        if ( prefix ) {
            removePrefix( Message, prefix[ 0 ] );
            if ( Message.content.length > 0 ) {
                const commandArgs = getCommandArgs( Message );

                if ( Client.CommandMap.has( `${ commandArgs[ 0 ] } ${ commandArgs[ 1 ] }` ) ) { // Accounts for sub commands
                    textCommandCount.inc( { command: `${ commandArgs[ 0 ] } ${ commandArgs[ 1 ] }` } );
                    Client.CommandMap.get( `${ commandArgs[ 0 ] } ${ commandArgs[ 1 ] }` ).textCommand( Message );

                } else if ( Client.CommandMap.has( `${ commandArgs[ 0 ] }` ) ) {
                    textCommandCount.inc( { command: commandArgs[ 0 ] } );
                    Client.CommandMap.get( `${ commandArgs[ 0 ] }` ).textCommand( Message );
                }

            } else {
                Message.channel.createMessage( {
                    "messageReference": { "messageID": Message.id }, "embeds":
                        [ new EmbedBuilder()
                            .author( Client.user.username, Client.user.avatarURL() )
                            .thumbnail( Client.user.avatarURL() )
                            .description( `**Hello 👋**\nThis is a bot` )
                            .toJSON()
                        ]
                } ).catch( ( error ) => Logger.error( `Failed to respond to client ping`, { source: "messageCreate.js", error: error } ) );
            }
        }
    }
}

function removePrefix ( Message: Message, prefix: string ) {
    Message.content = Message.content.trim().substring( prefix.length ).trim();
}

function getCommandArgs ( Message: Message ) {
    return Message.content.split( " " ).filter( Boolean );
}