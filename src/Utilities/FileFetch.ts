import { readdir } from "fs/promises";
import path from "path";

/**
 * Iteratively fetch files of a given type, from a given directory
 * @param directory The path, from ./build/, to retrieve files from
 * @param fileTypes A whitelist of file extensions to look for
 */
export default async function* fetchFiles ( directory: string, fileTypes = new Set( [ "js" ] ) ) {
    if ( !directory.startsWith( "./build/" ) ) directory = "./build/" + directory;

    const dirContents = await readdir( directory, { "withFileTypes": true } );

    for ( const file of dirContents ) {
        const fileName: string = directory + ( directory.endsWith( "/" ) ? "" : "/" ) + file.name;

        if ( file.isDirectory() ) {
            yield* fetchFiles( fileName );

        } else if ( fileTypes.has( fileName.split( "." ).pop() as string ) ) {
            const filePath = path.resolve( directory, file.name );

            yield `file://${ filePath }`;
        }
    }
}