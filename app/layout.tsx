import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elite Global Excellence | International Academic & Research Services',
  description:
    'Elite Global Excellence (EGE) - Academic and research services, international conferences, workshops, courses, mock viva defense, and institutional collaboration.',
  openGraph: {
    title: 'Elite Global Excellence | International Academic & Research Services',
    description:
      'Elite Global Excellence (EGE) - Academic and research services, international conferences, workshops, courses, mock viva defense, and institutional collaboration.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elite Global Excellence | International Academic & Research Services',
    description:
      'Elite Global Excellence (EGE) - Academic and research services, international conferences, workshops, courses, mock viva defense, and institutional collaboration.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
