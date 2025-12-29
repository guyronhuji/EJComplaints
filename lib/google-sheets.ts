import { google } from 'googleapis';
import path from 'path';

export const getGoogleSheets = async () => {
    try {
        let auth;

        // Priority 1: Raw JSON content from Env Var (Best for Vercel)
        if (process.env.GOOGLE_CREDENTIALS_JSON) {
            const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
            // Fix private_key formatting (unescape newlines)
            if (credentials.private_key) {
                credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
            }
            auth = new google.auth.GoogleAuth({
                credentials,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        }
        // Priority 2: File Path (Best for Local)
        else {
            const keyFilePath = path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS || 'ejcomplaint-7f420b25c435.json');
            auth = new google.auth.GoogleAuth({
                keyFile: keyFilePath,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
        }

        const client = await auth.getClient();
        return google.sheets({ version: 'v4', auth: client as any });
    } catch (error) {
        console.error("Auth Error:", error);
        throw new Error("Failed to authenticate with Google");
    }
};
