/**
 * @file
 * Winston transport for storing daily logs of everything into a file
 */

import { transports, format } from "winston";
import "winston-daily-rotate-file";

const allFileTransport = new transports.DailyRotateFile( {
    "dirname": "logs",
    "filename": "%DATE%-all.log",
    "datePattern": "YY-MM-DD",
    "maxSize": "20m",
    "maxFiles": "14d",
    "format": format.combine( format.timestamp( { "format": "HH:mm:ss DD-MM-YY" } ), format.json() )
} );

export default allFileTransport;