/**
 * @file 
 * Defines a /vote route on the webserver which will listen for and handle vote requests
 */

import Express from "express";
import handleVote from "./VoteHandler.js";

const VoteRouter = Express.Router();

VoteRouter.post( "/vote", async function ( req, res ) {
    if ( req.headers?.authorization === process.env.VOTE_AUTH as string ) {
        res.status( 200 ).send( "OK" );
        handleVote( req );
    } else {
        res.status( 401 ).send( "Unauthorized request" );
    }
} );

export default VoteRouter;