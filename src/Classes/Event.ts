import type { ClientEvents } from "oceanic.js";
import type BotClient from "./Client";

export abstract class Event {
    public name: keyof ClientEvents;
    public once?: boolean | undefined;

    constructor( name: keyof ClientEvents, once: boolean | undefined = undefined ) {
        this.name = name;
        this.once = once;
    };

    public invoke ( Client: BotClient, ...args: any ) { }
}