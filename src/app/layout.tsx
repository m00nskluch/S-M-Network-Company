import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "S&M Network Company | Desarrollo Web para PYMEs en Santiago, Chile",
  description:
    "Impulsamos el crecimiento digital de restaurantes, comercios locales y distribuidoras en Santiago con webs rápidas, menús digitales y catálogos interactivos. Sin cobros mensuales. Presupuesto justo y comunicación cercana.",
  keywords: [
    "desarrollo web Santiago",
    "páginas web para PYMEs",
    "menú digital restaurante Chile",
    "catálogo digital WhatsApp",
    "S&M Network Company",
    "Next.js Chile",
  ],
  openGraph: {
    title: "S&M Network Company | Desarrollo Web para PYMEs en Santiago",
    description:
      "Webs rápidas y empáticas para pequeñas empresas. Presupuesto justo, código propio, conexión directa.",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
