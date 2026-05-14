import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Daniel Diaz de Leon Morales | AI/ML Builder & Data Science Student",
    template: "%s | Daniel Diaz de Leon Morales",
  },
  description:
    "Portfolio of Daniel Diaz de Leon Morales, a Data Science student at Tecnológico de Monterrey building AI systems, developer tools, and technically ambitious software projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
