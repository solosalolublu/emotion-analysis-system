import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles.css"; // Добавляем наш файл стилей с зелено-голубым градиентом
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { ThemeStyles } from "@/components/ThemeStyles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Система анализа эмоций в тексте",
  description: "Анализ эмоционального тона текстовых сообщений",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head />
      <ThemeStyles />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Декоративные элементы Green Beach */}
        <div className="beach-wave"></div>
        <div className="beach-circle"></div>
        <div className="beach-circle" style={{ top: '60%', left: '5%', width: '200px', height: '200px' }}></div>

        <AuthProvider>
          <Navbar />
          <main className="container mx-auto py-6 px-4 relative z-10">
            {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
