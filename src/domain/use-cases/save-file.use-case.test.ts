// Core imports.
import fs from 'fs';

// Local imports.
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {

    const customOptions = { 
        fileContent: 'Custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }

    const customFilePath = `${ customOptions.fileDestination }/${ customOptions.fileName }.txt`;

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    afterEach(() => {
        // Clean up.
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists)  fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExists)  fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = { fileContent: 'Test content' }

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf8' });
        
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkDirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        mkDirSpy.mockRestore();
    });

    test('should return false if file could not be written', () => {

        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false);

        writeFileSpy.mockRestore();
    });

});
