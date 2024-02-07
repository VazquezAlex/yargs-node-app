// Core imports.
import fs from 'fs';


let outputMessage = '';
const base = 6;
const headerMessage = `
================================================
               Tabla del ${ base }
================================================
`;

for (let i = 1; i <= 10; i++) {
    outputMessage += `${ i } x ${ base } = ${ i * base }\n`;
}

outputMessage = headerMessage + outputMessage;

const outputPath = `outputs`

// Create the folder if it doesn't exist.
fs.mkdirSync(outputPath, { recursive: true });

// Save the file.
fs.writeFileSync(`${ outputPath }/table-${ base }.txt`, outputMessage);
console.log('File Created');