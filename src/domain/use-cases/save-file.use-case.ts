// Core imports.
import fs from 'fs';

export interface SaveFileUseCase {
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        /**
         * Repository.
         */
    ) {}

    execute ({ 
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table'
    }: Options): boolean {

        try {
            // Create the folder if it doesn't exist.
            fs.mkdirSync(fileDestination, { recursive: true });
    
            // Save the file.
            fs.writeFileSync(`${ fileDestination }/${ fileName }.txt`, fileContent);
    
            return true;
        } catch (e) {
            return false;        
        }

    }

}