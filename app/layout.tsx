import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Twolabs | Data for Physical Intelligence',
  description: 'We capture what robots need to learn. Building the foundational datasets that teach machines to work alongside us in the fields.',
  keywords: ['robotics', 'agriculture', 'training data', 'AI', 'machine learning', 'farming'],
  authors: [{ name: 'TWOLABS' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Twolabs | Data for Physical Intelligence',
    description: 'The infrastructure layer for physical AI in agriculture.',
    url: 'https://twolabs.ai',
    siteName: 'Twolabs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twolabs | Data for Physical Intelligence',
    description: 'The infrastructure layer for physical AI in agriculture.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
