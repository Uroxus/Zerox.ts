/**
 * @file 
 * Defines the actions when a new vote has been received
 */

import { Logger } from "../../Utilities/Logger.js";
import type { Request } from "express";

/**
 * Handle a successful vote by rewarding the user or logging the vote
 * 
 * @param request The http request information
 */
export default function handleVote ( request: Request ) {
    Logger.verbose( `Received vote from ${ request.body.user }`, { source: "VoteHandler.js" } );
}