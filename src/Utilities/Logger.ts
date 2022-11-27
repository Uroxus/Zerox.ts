/**
 * @file
 * Creates and exports a Winston logging instance
 */

import { createLogger } from "winston";
import Environment from "../Constants/Environment";

import allFileTransport from "./Transports/AllLogFile.js";
import consoleTransport from "./Transports/Console.js";
import errorLogFileTransport from "./Transports/ErrorFile.js";

export const Logger = createLogger( {
    "level": process.env.NODE_ENV === Environment.PROD ? "info" : "debug",
    "transports": [
        consoleTransport,
        allFileTransport,
        errorLogFileTransport
    ]
} );