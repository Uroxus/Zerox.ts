/**
 * @file
 * Define the information required by bot listing sites to automatically manage guild count
 * Each will only post if there is a .env entry with the xxx_AUTH key
 */

import type { Listing } from "../../Types";

const Listings: { [ siteToken: string ]: Listing; } = {
    "TOP_GG_AUTH": {
        "endpoint": "https://top.gg/api/bots/:id/stats",
        "payloadKey": "server_count",
        "siteName": "top.gg"
    },

    "DISCORD_BOT_LIST_AUTH": {
        "endpoint": "https://discordbotlist.com/api/v1/bots/:id/stats",
        "payloadKey": "guilds",
        "siteName": "discordbotlist.com"
    }
};

export default Listings;