import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: "Twolabs | Training Data for Agricultural Robotics",
  description: "We capture what robots need to learn. POV footage from farms in India and Central Asia.",
  openGraph: {
    title: "Twolabs | Training Data for Agricultural Robotics",
    description: "The infrastructure layer for physical AI in agriculture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
