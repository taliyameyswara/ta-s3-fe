import "./globals.css";
import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constant/index";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { NextAuthProvider } from "@/components/providers/session-provider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <NextTopLoader />
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
