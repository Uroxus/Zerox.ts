/**
 * @file
 * Creates a webserver, listening on the .env defined PORT, which is used to handle user votes and Prometheus metric scraping
 */

import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import { Logger } from "../Utilities/Logger.js";

// Route Definitions
import PrometheusRouter from "../Prometheus/route.js";
import VoteRouter from "./Voting/route.js";

const App = Express();

App.use( Express.urlencoded( { extended: false } ) );
App.use( Express.json() );

App.use( "/", [ PrometheusRouter, VoteRouter ] );

App.listen( process.env.PORT || 8080, () => {
    Logger.info( `Webserver listening on port ${ process.env.PORT }`, { source: "index.js" } );
} );
