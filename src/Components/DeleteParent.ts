import { ButtonComponent, ButtonStyles, ComponentInteraction, ComponentTypes } from "oceanic.js";

export default class DeleteParent {
    static Definition: ButtonComponent = {
        "type": ComponentTypes.BUTTON,
        "style": ButtonStyles.DANGER,
        "emoji": {
            "name": "trashcan",
            "id": "880525129401127002"
        },
        "customID": "delete-parent"
    };


    static async invoke ( Interaction: ComponentInteraction ) {
        await Interaction.deferUpdate();
        await Interaction.deleteOriginal();
    }
}