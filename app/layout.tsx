import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://monkreflections.com";
const imageUrl = `${siteUrl}/og-image.png`; // Add your OG image to /public/og-image.png

export const metadata: Metadata = {
  title: "Rekindle Preorder",
  description:
    "Preorder the physical edition of Rekindle. Currently available on Amazon Kindle. Sign up to be notified when physical books are available.",
  applicationName: "Rekindle Preorder",
  authors: [
    {
      name: "Monk Reflections",
      url: siteUrl,
    },
  ],
  keywords: ["preorder", "book", "rekindle", "physical book", "monk reflections"],
  creator: "Monk Reflections",
  publisher: "Monk Reflections",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Rekindle Preorder",
    description:
      "Preorder the physical edition of Rekindle. Currently available on Amazon Kindle. Sign up to be notified when physical books are available.",
    siteName: "Rekindle",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Rekindle Book Preorder",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rekindle Preorder",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    // Add your verification codes here (Google Search Console, etc.)
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
