import { fetch } from "undici";
import Environment from "../Constants/Environment";
import Listings from "../Constants/Listings.js";
import type { Client } from "oceanic.js";

/**
 * Starts the site management loop
 * @param Client 
 */
export async function manageListings ( Client: Client ) {
    if ( process.env.NODE_ENV === Environment.PROD ) {
        loopSiteListings( Client );

        console.info( `Starting bot listings update interval` );
        setInterval( () => {
            loopSiteListings( Client );
        }, 1800000 );
    }
};

/**
 * Loops the list of sites defined in the Constants and posts updates to 
 * sites that have an Authorization key provided in the env
 * @param Client 
 */
function loopSiteListings ( Client: Client ) {
    for ( const siteListingKey of Object.keys( Listings ).filter( ( siteAuth ) => siteAuth in process.env ) ) {
        updateStats( Client, siteListingKey );
    }
}

/**
 * Post the updated guild number to a given site
 * @param Client Bot client reference to retrieve the number of guilds from
 * @param siteListingKey The object key from the Listings constants to update the stats of
 */
async function updateStats ( Client: Client, siteListingKey: string ) {
    const listing = Listings[ siteListingKey ];

    await fetch( listing.endpoint.replace( ":id", Client.user.id ), {
        "method": "POST",
        "headers": {
            "Authorization": process.env[ siteListingKey ] as string
        },
        "body": JSON.stringify( {
            [ listing.payloadKey ]: Client.guilds.size
        } )
    } ).catch( error => {
        console.error( `Failed to update stats on ${ siteListingKey }: ${ error }` );
    } );
}; 