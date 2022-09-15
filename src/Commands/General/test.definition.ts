import { ApplicationCommandTypes } from "oceanic.js";
import type { CreateChatInputApplicationCommandOptions } from "oceanic.js";

const testDefinition: CreateChatInputApplicationCommandOptions = {
    "name": "test",
    "description": "an example command",
    "type": ApplicationCommandTypes.CHAT_INPUT
};

export default testDefinition;