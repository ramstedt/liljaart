import type { Metadata } from 'next';
import { Poppins, Geist_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Karin Lilja',
  description: 'Karin Lilja ',
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
