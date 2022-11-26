/**
 * @file
 * Winston transport for storing daily logs of errors into a file
 */

import { transports, format } from "winston";
import "winston-daily-rotate-file";

const errorLogFileTransport = new transports.DailyRotateFile( {
    "dirname": "logs",
    "filename": "%DATE%-error.log",
    "datePattern": "YY-MM-DD",
    "maxSize": "20m",
    "maxFiles": "14d",
    "level": "error",
    "format": format.combine( format.timestamp( { "format": "HH:mm:ss DD-MM-YY" } ), format.json() )
} );

export default errorLogFileTransport;