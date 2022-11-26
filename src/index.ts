/**
 * @file 
 * Starts the webserver for Prometheus and Vote handling & connects the bot to Discord
 */

import "./Webserver/index.js";
import BotClient from "./Classes/Client.js";

const client = new BotClient();
client.connect();