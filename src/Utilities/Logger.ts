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

export const Logger = createLogger( {
    "transports": [
        new transports.Console( {
            "format": format.combine(
                format( ( info ) => ( { ...info, "level": info.level.toUpperCase() } ) )(),
                format.errors( { "stack": true } ),
                format.timestamp( { "format": "DD/MM/YY HH:mm:ss" } ),
                format.colorize(),
                format.align(),
                format.printf( info => `\u001b[90m[${ info.timestamp.split( " " )[ 0 ] }] [${ info.timestamp.split( " " )[ 1 ] }] [\u001b[0m${ info.level }\u001b[90m] »\u001b[0m ${ info.message }` )
            ),
            "stderrLevels": [ "error", "warning" ]
        } ),
        allFileTransport,
        errorFileTransport
    ]
} );