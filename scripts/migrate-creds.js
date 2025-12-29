const fs = require('fs');
const path = require('path');

const dir = process.cwd();
const files = fs.readdirSync(dir);
const jsonFile = files.find(f => f.startsWith('ejcomplaint-') && f.endsWith('.json'));

if (!jsonFile) {
    console.error("No credentials JSON file found!");
    process.exit(1);
}

const content = fs.readFileSync(path.join(dir, jsonFile), 'utf8');
// Minify the JSON to a single line
const minified = JSON.stringify(JSON.parse(content));

const envPath = path.join(dir, '.env.local');
const envEntry = `\nGOOGLE_CREDENTIALS_JSON='${minified}'\n`;

fs.appendFileSync(envPath, envEntry);
console.log(`Appended credentials to ${envPath}`);

// Delete the original file
fs.unlinkSync(path.join(dir, jsonFile));
console.log(`Deleted ${jsonFile}`);
