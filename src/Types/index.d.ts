/**
 * Information required by bot listing sites such as top.gg to manage automatically updating guild count
 */
export interface Listing {
    /** URL to send the data to */
    "endpoint": string,
    /** Property that the site is expecting to update */
    "payloadKey": string,
    /** User-friendly site name */
    "siteName": string;
}