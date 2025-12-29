require('dotenv').config({ path: '.env.local' });

const creds = process.env.GOOGLE_CREDENTIALS_JSON;
console.log("TYPE:", typeof creds);
console.log("LENGTH:", creds ? creds.length : 0);
console.log("CONTENT START:", creds ? creds.substring(0, 50) : "N/A");

if (creds) {
    try {
        const parsed = JSON.parse(creds);
        console.log("PARSE SUCCESS!");
        console.log("PRIVATE KEY START:", parsed.private_key ? parsed.private_key.substring(0, 50) : "MISSING");
        console.log("PRIVATE KEY HAS NEWLINES?", parsed.private_key.includes('\n'));
        console.log("PRIVATE KEY HAS LITERAL \\n?", parsed.private_key.includes('\\n'));
    } catch (e) {
        console.log("PARSE FAILED:", e.message);
    }
}
