import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import ScrollToTop from "@/components/ScrollToTop";
import MobileNavigation from "@/components/MobileNavigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "HOLY-MARKET — Christian Business Community",
    template: "%s | HOLY-MARKET",
  },
  description: "A Christian Business Network for Kingdom Entrepreneurs.",
  metadataBase: new URL("https://holy-market-next.vercel.app"),
  applicationName: "HOLY-MARKET",
  authors: [{ name: "HOLY-MARKET" }],
  openGraph: {
    type: "website",
    title: "HOLY-MARKET — Christian Business Community",
    description: "Network, discover, and grow Kingdom-aligned businesses.",
    url: "/",
    siteName: "HOLY-MARKET",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOLY-MARKET — Christian Business Community",
    description: "Network, discover, and grow Kingdom-aligned businesses.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${poppins.variable} font-sans antialiased min-h-screen`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded">Skip to content</a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <main id="main" className="min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
        <Toaster position="bottom-center" />
        <ScrollToTop />
        <MobileNavigation />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
