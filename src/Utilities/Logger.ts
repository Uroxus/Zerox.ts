import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";

const jsonFormat = format.combine( format.timestamp( { "format": "HH:mm:ss DD-MM-YY" } ), format.json() );

const allFileTransport = new transports.DailyRotateFile( {
    "dirname": "logs",
    "filename": "%DATE%-all.log",
    "datePattern": "YY-MM-DD",
    "maxSize": "20m",
    "maxFiles": "14d",
    "format": jsonFormat
} );

const errorFileTransport = new transports.DailyRotateFile( {
    "dirname": "logs",
    "filename": "%DATE%-error.log",
    "datePattern": "YY-MM-DD",
    "maxSize": "20m",
    "maxFiles": "14d",
    "level": "error",
    "format": jsonFormat
} );

const grey = `\u001b[90m`;
const white = `\u001b[0m`;

export const Logger = createLogger( {
    "transports": [
        new transports.Console( {
            "format": format.combine(
                format( ( info ) => ( { ...info, "level": info.level.toUpperCase() } ) )(),
                format.errors( { "stack": true } ),
                format.timestamp( { "format": "DD/MM/YY HH:mm:ss" } ),
                format.colorize(),
                format.align(),
                format.printf( ( { level, message, ...meta } ) => `${ grey }[${ meta.timestamp.split( " " )[ 0 ] }] [${ meta.timestamp.split( " " )[ 1 ] }] ${ meta?.source ? `[${ meta.source }] ` : '' }[${ level }${ grey }] »${ white } ${ message }` )
            ),
            "stderrLevels": [ "error", "warning" ]
        } ),
        allFileTransport,
        errorFileTransport
    ]
} );