import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "אפליקציית תלונות",
  description: "הגש תלונה בקלות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${rubik.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        {children}
      </body>
    </html>
  );
}
