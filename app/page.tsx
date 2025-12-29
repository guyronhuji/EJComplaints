import { ComplaintForm } from "@/components/complaint-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            הגשת תלונה
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            אנחנו כאן כדי להקשיב. אנא מלאו את הפרטים מטה ונטפל בפנייתכם בהקדם.
          </p>
        </div>

        <ComplaintForm />
      </div>
    </main>
  );
}
