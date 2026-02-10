import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Twolabs | Training Data for Agricultural Robotics",
  description: "We capture what robots need to learn. POV footage from farms in India and Central Asia. Labeled, structured, ready for robotics training.",
  keywords: ["robotics", "agriculture", "training data", "machine learning", "egocentric video", "farming"],
  authors: [{ name: "Twolabs" }],
  openGraph: {
    title: "Twolabs | Training Data for Agricultural Robotics",
    description: "The infrastructure layer for physical AI in agriculture.",
    url: "https://twolabs.so",
    siteName: "Twolabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
