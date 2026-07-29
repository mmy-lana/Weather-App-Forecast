import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atmosphere - 5-Day Weather Forecast & Charts',
  description:
    'Real-time glassmorphism weather dashboard powered by Open-Meteo and Chart.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased selection:bg-white/20`}>
        {children}
      </body>
    </html>
  );
}