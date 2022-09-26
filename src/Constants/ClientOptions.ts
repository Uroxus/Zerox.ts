import { ClientOptions } from "oceanic.js";
import Environment from "./Environment";

const token = `${ process.env.NODE_ENV === Environment.PROD ? process.env.PROD_BOT_TOKEN as string : process.env.DEV_BOT_TOKEN as string }`;

const ClientOptions: ClientOptions = {
    "auth": `${ token.startsWith( "Bot " ) ? '' : "Bot " }${ token }`,

    "gateway": {
        "maxShards": "auto",
    },

    "collectionLimits": {
        "messages": 0
    },
};

export default ClientOptions;