import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { Outfit, Inter } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'S&M Network Company | Desarrollo Web para PYMEs en Santiago, Chile',
  description:
    'Impulsamos el crecimiento digital de restaurantes, comercios locales y distribuidoras en Santiago con webs rápidas, menús digitales y catálogos interactivos. Sin cobros mensuales. Presupuesto justo y comunicación cercana.',
  keywords: [
    'desarrollo web Santiago',
    'páginas web para PYMEs',
    'menú digital restaurante Chile',
    'catálogo digital WhatsApp',
    'S&M Network Company',
    'Next.js Chile',
  ],
  openGraph: {
    title: 'S&M Network Company | Desarrollo Web para PYMEs en Santiago',
    description:
      'Webs rápidas y empáticas para pequeñas empresas. Presupuesto justo, código propio, conexión directa.',
    locale: 'es_CL',
    type: 'website',
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
      className={`${outfit.variable} ${inter.variable} ${GeistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
