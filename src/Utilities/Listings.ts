/**
 * @file
 * Manages posting the number of guilds the bot is in to voting sites
 */

import { fetch } from "undici";
import Environment from "../Constants/BotConfig/Environment";
import Listings from "../Constants/BotConfig/Listings.js";
import { Logger } from "../Utilities/Logger.js";
import type { Client } from "oceanic.js";

/**
 * Starts the site management loop
 * @param Client 
 */
export async function manageListings ( Client: Client ) {
    if ( process.env.NODE_ENV === Environment.PROD ) {
        _loopSiteListings( Client );

        Logger.info( `Starting bot listings update interval`, { source: "Listings.js" } );
        setInterval( () => {
            _loopSiteListings( Client );
        }, 1800000 );
    }
};

/**
 * Loops the list of sites defined in the Constants and posts updates to 
 * sites that have an Authorization key provided in the env
 * @param Client 
 */
function _loopSiteListings ( Client: Client ) {
    for ( const siteListingKey of Object.keys( Listings ).filter( ( siteAuth ) => siteAuth in process.env ) ) {
        _updateStats( Client, siteListingKey );
    }
}

/**
 * Post the updated guild number to a given site
 * @param Client Bot client reference to retrieve the number of guilds from
 * @param siteListingKey The object key from the Listings constants to update the stats of
 */
async function _updateStats ( Client: Client, siteListingKey: string ) {
    const listing = Listings[ siteListingKey ];

    await fetch( listing.endpoint.replace( ":id", Client.user.id ), {
        "method": "POST",
        "headers": {
            "Authorization": process.env[ siteListingKey ] as string
        },
        "body": JSON.stringify( {
            [ listing.payloadKey ]: Client.guilds.size
        } )
    } ).catch( ( error ) => {
        Logger.error( `Failed to update stats on ${ siteListingKey }`, { source: "Listings.js", error: error } );
    } );
}; 