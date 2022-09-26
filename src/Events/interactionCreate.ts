import { Event } from "../Classes/Event.js";
import { InteractionTypes, ApplicationCommandOptionTypes, ApplicationCommandTypes, ComponentInteraction } from "oceanic.js";
import { componentCommandCount, interactionCommandCount } from "../Prometheus/Metrics/Command.js";
import type { ApplicationCommandInteractionResolvedData, CommandInteraction } from "oceanic.js";
import type { AnyInteractionGateway } from "oceanic.js";
import type BotClient from "../Classes/Client.js";
import type { Command } from "../Classes/Command.js";

export default class InteractionCreate extends Event {
    constructor() {
        super( "interactionCreate" );
    }

    public invoke ( Client: BotClient, Interaction: AnyInteractionGateway ): void {
        switch ( Interaction.type ) {
            case InteractionTypes.APPLICATION_COMMAND:
                const CommandInteraction: CommandInteraction = Interaction;
                const interactionArgs = getCommandOptions( CommandInteraction.data.options, { "COMMAND": CommandInteraction.data.name, "RESOLVED": CommandInteraction.data?.resolved } );

                const commandName = commandCacheKey( interactionArgs );
                const Command: Command = Client.CommandMap.get( commandName );
                if ( Command ) {
                    switch ( Interaction.data.type ) {
                        case ApplicationCommandTypes.CHAT_INPUT:
                            interactionCommandCount.inc( { "type": "CHAT_INPUT", "command": commandName } );
                            Command.slashCommand( CommandInteraction );
                            break;
                        case ApplicationCommandTypes.MESSAGE:
                            interactionCommandCount.inc( { "type": "MESSAGE_CONTEXT", "command": commandName } );
                            Command.messageContext( CommandInteraction );
                            break;
                        case ApplicationCommandTypes.USER:
                            interactionCommandCount.inc( { "type": "USER_CONTEXT", "command": commandName } );
                            Command.userContext( CommandInteraction );
                            break;
                    }
                    break;
                } else {
                    console.error( `Received application command of type ${ Interaction.data.type } for "${ commandName }" but found no handler` );
                    break;
                }
            case InteractionTypes.MESSAGE_COMPONENT:
                const ComponentInteraction: ComponentInteraction = Interaction;

                if ( Client.ComponentMap.has( Interaction.data.customID ) ) {
                    componentCommandCount.inc( { "name": ComponentInteraction.data.customID } );
                    Client.ComponentMap.get( ComponentInteraction.data.customID )( ComponentInteraction );
                } else {
                    console.error( `Component Interaction ${ Interaction.data.customID } received with no handler` );
                }

                break;
        }
    }
}

function commandCacheKey ( interactionArgs: any ) {
    return interactionArgs[ "COMMAND" ] + ( interactionArgs[ "SUB_COMMAND_GROUP" ] || '' ) + ( interactionArgs[ "SUB_COMMAND" ] || '' );
}

function getCommandOptions ( options: any, extractedValues: { COMMAND: string, RESOLVED: ApplicationCommandInteractionResolvedData | undefined; } ) {
    try {
        for ( const option of options ) {
            if ( option[ "type" ] === ApplicationCommandOptionTypes.SUB_COMMAND ) {
                extractedValues[ "SUB_COMMAND" ] = option[ "name" ];
            } else if ( option[ "type" ] === ApplicationCommandOptionTypes.SUB_COMMAND_GROUP ) {
                extractedValues[ "SUB_COMMAND_GROUP" ] = option[ "name" ];
            } else {
                extractedValues[ option[ "name" ] ] = option[ "value" ];
            }

            if ( option[ "options" ] ) getCommandOptions( option[ "options" ], extractedValues );
        }
    } catch ( error ) {
    } finally {
        return extractedValues;
    }
};