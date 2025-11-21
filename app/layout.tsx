import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Modern E-Commerce - Shop the Best Deals Online',
  description: 'Discover amazing products at unbeatable prices. Shop electronics, fashion, home & kitchen, and more with fast delivery and secure payments.',
  keywords: 'ecommerce, online shopping, deals, electronics, fashion, home, kitchen',
  openGraph: {
    title: 'Modern E-Commerce - Shop the Best Deals Online',
    description: 'Discover amazing products at unbeatable prices.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData type="website" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

