import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from '../domain/use-cases/save-file.use-case';

interface RunOptions {
    base: number;
    fileDestination: string;
    fileName: string;
    limit: number;
    showTable: boolean;
}

export class ServerApp {

    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Server running...');

        const table = new CreateTable().execute({ base, limit });
        const fileWasCreated = new SaveFile().execute({ 
            fileContent: table,
            fileDestination,
            fileName,
        });

        if (showTable) console.log(table);

        ( fileWasCreated )
            ? console.log('File was created successfully')
            : console.log('File was not created successfully'); 
        
    }

}