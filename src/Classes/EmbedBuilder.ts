import { EmbedColors } from "../Constants/EmbedColors.js";
import type { EmbedField, EmbedOptions } from "oceanic.js";

export default class EmbedBuilder {
    public embed: EmbedOptions;

    constructor() {
        this.embed = {
            "color": EmbedColors.default
        };
    }

    /**
     * @param name The text that is displayed as the Author
     * @param iconURL URL to an image
     * @param url URL to make the Author text a hyperlink to
     */
    author ( name: string, iconURL: string | undefined = undefined, url: string | undefined = undefined ) {
        this.embed.author = { name, url, iconURL };
        return this;
    }

    /**
     * @param value The text to display as the Embed title
     */
    title ( value: string ) {
        this.embed.title = value;
        return this;
    }

    /**
     * @param value The text to display as the Embed description
     */
    description ( value: string ) {
        this.embed.description = value;
        return this;
    }

    /**
     * Add a single field to the Embed
     * @param field The field to add
     */
    field ( field: EmbedField ) {
        this.embed.fields ? this.embed.fields.push( field ) : this.embed.fields = [ field ];
        return this;
    };

    /**
     * Define multiple Embed fields in one call
     * @param fields The fields to add to the embed
     */
    fields ( fields: EmbedField[] ) {
        this.embed.fields = fields;
        return this;
    }

    /**
     * @param url URL to an image
     */
    thumbnail ( url: string ) {
        this.embed.thumbnail = { url };
        return this;
    }

    /**
     * @param url URL to an image
     */
    image ( url: string ) {
        this.embed.thumbnail = { url };
        return this;
    }

    /**
     * @param value The colour of the embed, likely from EmbedColors constants
     */
    color ( value: number ) {
        this.embed.color = value;
        return this;
    };

    /**
     * @param text The text to display in the Embed footer
     * @param iconURL URL to an image
     */
    footer ( text: string, iconURL: string | undefined = undefined ) {
        this.embed.footer = { text, iconURL };
        return this;
    };

    timestamp () {
        this.embed.timestamp = new Date().toString();
        return this;
    }

    toJSON () {
        return this.embed;
    }
}