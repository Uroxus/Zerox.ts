/**
 * @file
 * Winston transport for formatting and printing stuff to the console
 */

import { transports, format } from "winston";
import "winston-daily-rotate-file";

const grey = `\u001b[90m`;
const white = `\u001b[0m`;

const consoleTransport = new transports.Console( {
    "format": format.combine(
        format( ( info ) => ( { ...info, "level": info.level.toUpperCase() } ) )(),
        format.errors( { "stack": true } ),
        format.timestamp( { "format": "DD/MM/YY HH:mm:ss" } ),
        format.colorize(),
        format.align(),
        format.printf( ( { level, message, ...meta } ) => `${ grey }[${ meta.timestamp.split( " " )[ 0 ] }] [${ meta.timestamp.split( " " )[ 1 ] }] ${ meta?.source ? `[${ meta.source }] ` : '' }[${ level }${ grey }] »${ white } ${ message }` )
    ),
    "stderrLevels": [ "error", "warning" ]
} );

export default consoleTransport;