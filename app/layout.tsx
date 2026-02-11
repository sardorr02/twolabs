import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
