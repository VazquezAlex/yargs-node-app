// Core imports.
import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

let outputMessage = '';
const base = yarg.b;
const show = yarg.s;
const limit = yarg.l;
const headerMessage = `
================================================
               Tabla del ${ base }
================================================
`;

for (let i = 1; i <= limit; i++) {
    outputMessage += `${ i } x ${ base } = ${ i * base }\n`;
}

outputMessage = headerMessage + outputMessage;

if (show) console.log(outputMessage);

const outputPath = `outputs`

// Create the folder if it doesn't exist.
fs.mkdirSync(outputPath, { recursive: true });

// Save the file.
fs.writeFileSync(`${ outputPath }/table-${ base }.txt`, outputMessage);
console.log('File Created');