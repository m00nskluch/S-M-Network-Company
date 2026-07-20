import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
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
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
