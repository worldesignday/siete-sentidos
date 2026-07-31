import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    title: site.seoTitle,
    description: site.seoDescription,
    metadataBase: new URL(site.canonicalUrl),
    alternates: { canonical: site.canonicalUrl },
    robots: { index: true, follow: true },
    icons: { icon: [{ url: "/favicon.ico" }, { url: "/icon.svg", type: "image/svg+xml" }] },
    openGraph: {
      type: "website",
      url: site.canonicalUrl,
      title: site.ogTitle,
      description: site.ogDescription,
      images: [{ url: site.ogImage, width: 1200, height: 630 }],
      locale: "es_CO",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
