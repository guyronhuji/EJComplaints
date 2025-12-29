const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

async function createSheet() {
    const keyFilePath = path.join(process.cwd(), 'ejcomplaint-7f420b25c435.json');

    if (!fs.existsSync(keyFilePath)) {
        console.error(`Error: Key file not found at ${keyFilePath}`);
        process.exit(1);
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });
    const drive = google.drive({ version: 'v3', auth: client });

    console.log(`Authenticated as: ${client.credentials.client_email || 'Unknown Service Account'}`);

    try {
        // 1. Create the Spreadsheet
        const createResponse = await sheets.spreadsheets.create({
            resource: {
                properties: {
                    title: 'EJ Complaints DB',
                },
            },
        });

        const spreadsheetId = createResponse.data.spreadsheetId;
        console.log(`\nSUCCESS: Created Spreadsheet!`);
        console.log(`ID: ${spreadsheetId}`);
        console.log(`URL: ${createResponse.data.spreadsheetUrl}`);

        // 2. Add Headers
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: 'A1:E1',
            valueInputOption: 'RAW',
            resource: {
                values: [['Timestamp', 'Name', 'Category', 'Description', 'Contact Info']]
            },
        });
        console.log('Headers added successfully.');

        // 3. Make it readable by anyone with the link (Optional, for easier user access effectively)
        // Or just print valid instructions. 
        // Let's try to share it with the user if they provided an email, but they didn't.
        // We will leave it private to the service account for now, but PRINT the URL.
        // The user won't be able to open it unless we share it.
        // I will add a step to make it "anyone with link can view" so the user can see it immediately?
        // No, that's insecure.
        // I will just output the ID and ask the user for their email in the next step to share it.

    } catch (err) {
        console.error('Error creating sheet:', err);
    }
}

createSheet();
