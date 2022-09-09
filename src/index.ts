import { Client } from "oceanic.js";
import ClientOptions from "./Constants/ClientOptions.js";

const client = new Client( ClientOptions );
client.on( "ready", () => console.log( "Connected" ) );
client.connect();