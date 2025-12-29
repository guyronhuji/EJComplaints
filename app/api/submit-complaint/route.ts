import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheets } from '@/lib/google-sheets';
import * as z from 'zod';

const formSchema = z.object({
    fullName: z.string().min(2),
    branch: z.string().min(1),
    incidentDate: z.string().optional(),
    description: z.string().min(10),
    contactInfo: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Validate data
        const validation = formSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.message }, { status: 400 });
        }

        const { fullName, branch, incidentDate, description, contactInfo } = validation.data;

        const sheets = await getGoogleSheets();
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (!spreadsheetId) {
            throw new Error("Missing GOOGLE_SHEET_ID");
        }

        // Append to sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'A:F', // Now A-F
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [new Date().toISOString(), fullName, branch, incidentDate || '', description, contactInfo || '']
                ],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
