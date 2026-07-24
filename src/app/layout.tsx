import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { LenisProvider } from './components/LenisProvider';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'S&M Network Company | Desarrollo Web para PYMEs en Santiago, Chile',
  description:
    'Transformamos PYMEs chilenas en potencias digitales. Páginas web rápidas, menús digitales y catálogos interactivos para restaurantes, comercios y distribuidoras en Santiago. Sin cobros mensuales. Presupuesto justo y comunicación cercana.',
  keywords: [
    'desarrollo web Santiago',
    'páginas web para PYMEs',
    'menú digital restaurante Chile',
    'catálogo digital WhatsApp',
    'S&M Network Company',
    'Next.js Chile',
    'Andri Manrrique',
    'Jeshua Useche',
    'digitalización PYME Santiago',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'S&M Network Company | Desarrollo Web para PYMEs en Santiago',
    description:
      'Transformamos PYMEs chilenas en potencias digitales. Webs rápidas, empáticas y diseñadas para vender.',
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
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${GeistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
