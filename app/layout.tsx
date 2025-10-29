import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { NavbarProvider } from '@/context/NavbarContext';
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
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
      <body>
        <NavbarProvider>
          <Navbar />
          {children}
          <Footer />
        </NavbarProvider>
      </body>
    </html>
  );
}
