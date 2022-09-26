import type { Request } from "express";

export default function handleVote ( request: Request ) {
    console.log( `Received vote from ${ request.body.user }` );
}