import { ButtonStyles, ComponentInteraction, ComponentTypes, TextButton } from "oceanic.js";

export default class DeleteParentComponent {
    // Value to listen for on InteractionCreate
    static customID = "delete-parent";
    public component: TextButton;

    constructor( { ...params } = {}, customisation = { style: undefined, emoji: undefined } ) {
        this.component = {
            "type": ComponentTypes.BUTTON,
            "style": customisation.style || ButtonStyles.DANGER,
            "emoji": customisation.emoji || {
                "name": "trashcan",
                "id": "880525129401127002"
            },
            "customID": `${ DeleteParentComponent.customID }${ Object.entries( params ).length > 0 ?
                '?' + Object.entries( params ).map( param => param.join( "=" ) ).join( "," )
                : '' }`
        };
    }

    toJSON () {
        return this.component;
    }

    static async invoke ( Interaction: ComponentInteraction, params: Object ) {
        await Interaction.deferUpdate();
        await Interaction.deleteOriginal();
    }
}