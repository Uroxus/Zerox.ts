import { Logger } from "../../Utilities/Logger.js";
import type { Request } from "express";

export default function handleVote ( request: Request ) {
    Logger.verbose( `Received vote from ${ request.body.user }`, { source: "VoteHandler.js" } );
}