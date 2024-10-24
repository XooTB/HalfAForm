import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import SessionWrapper from "@/components/SessionWrapper";
import NavBar from "@/components/NavBar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Former - Create beautiful and versatile forms",
  description: "Create beautiful and versatile forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionWrapper>
            <NavBar />
            {children}
            <Toaster />
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
