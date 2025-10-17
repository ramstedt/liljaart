import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Karin Lilja',
  description:
    'Karin Lilja är en konstnär och tatuerare baserad i Göteborg, utbildad vid Florence Academy of Art. Hon specialiserar sig på porträtt och oljemålningar i klassisk stil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sv' className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
