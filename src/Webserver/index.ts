import dotenv from "dotenv";
dotenv.config();

import Express from "express";

// Route Definitions
import PrometheusRouter from "../Prometheus/route.js";
import VoteRouter from "./Voting/route.js";

const App = Express();

App.use( Express.urlencoded( { extended: false } ) );
App.use( Express.json() );

App.use( "/", [ PrometheusRouter, VoteRouter ] );

App.listen( process.env.PORT, () => {
    console.log( `Webserver listening on port ${ process.env.PORT }` );
} );
