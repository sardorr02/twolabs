import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Twolabs | Training Data for Physical AI',
  description: 'We capture what robots need to learn. Egocentric video datasets for Physical Intelligence.',
  keywords: ['robotics', 'physical AI', 'training data', 'AI', 'machine learning', 'embodied AI', 'VLM'],
  authors: [{ name: 'TWOLABS' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Twolabs | Training Data for Physical AI',
    description: 'The data layer for Physical Intelligence. Egocentric video datasets for VLMs, world models, and humanoid robots.',
    url: 'https://twolabs.ai',
    siteName: 'Twolabs',
    type: 'website',
    images: [
      {
        url: 'https://twolabs.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Twolabs - Training Data for Physical AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twolabs | Training Data for Physical AI',
    description: 'The data layer for Physical Intelligence. Egocentric video datasets for VLMs, world models, and humanoid robots.',
    images: ['https://twolabs.ai/og-image.png'],
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
