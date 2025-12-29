"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "נא להזין שם מלא (לפחות 2 תווים)" }),
    branch: z.string().min(1, { message: "נא להזין שם סניף" }),
    incidentDate: z.string().optional(),
    description: z.string().min(10, { message: "תיאור התלונה חייב להכיל לפחות 10 תווים" }),
    contactInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ComplaintForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            branch: "",
            incidentDate: "",
            description: "",
            contactInfo: "",
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit-complaint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Failed to submit complaint');
            }

            setSuccess(true);
            form.reset();
        } catch (error) {
            console.error(error);
            alert("שגיאה בשליחת הטופס. נסה שוב.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (success) {
        return (
            <div className="w-full max-w-lg mx-auto bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">תלונתך התקבלה!</h2>
                <p className="text-green-700 dark:text-green-400 mb-6">נטפל בפנייתך בהקדם האפשרי.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-sm font-medium text-green-600 dark:text-green-300 underline hover:text-green-800 dark:hover:text-green-200"
                >
                    שלח תלונה נוספת
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 sm:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        שם מלא
                    </label>
                    <input
                        {...form.register("fullName")}
                        id="fullName"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="גיא רון"
                    />
                    {form.formState.errors.fullName && (
                        <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="branch" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        סניף
                    </label>
                    <input
                        {...form.register("branch")}
                        id="branch"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="שם הסניף"
                    />
                    {form.formState.errors.branch && (
                        <p className="text-sm text-red-500">{form.formState.errors.branch.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="incidentDate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        תאריך האירוע (משוער)
                    </label>
                    <input
                        {...form.register("incidentDate")}
                        id="incidentDate"
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="לדוגמה: 01/01/2024"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        תיאור התלונה
                    </label>
                    <textarea
                        {...form.register("description")}
                        id="description"
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="פרט את המקרה..."
                    />
                    {form.formState.errors.description && (
                        <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        פרטי קשר (אופציונלי)
                    </label>
                    <input
                        {...form.register("contactInfo")}
                        id="contactInfo"
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="טלפון או אימייל לחזרה"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                            שולח...
                        </>
                    ) : (
                        "שלח תלונה"
                    )}
                </button>
            </form>
        </div>
    );
}
