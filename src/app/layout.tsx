import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DunasTech | Observatório Inteligente do Turismo",
  description:
    "Sistema de Inteligência Turística Vivo — Sensor social B2C e painel preditivo B2G para gestão sustentável do turismo no Rio Grande do Norte.",
  keywords: ["turismo", "RN", "inteligência artificial", "sustentabilidade", "hackathon do sol"],
  authors: [{ name: "Equipe Dunas Tech" }],
};

export const viewport: Viewport = {
  themeColor: "#060913",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#060913] text-white">{children}</body>
    </html>
  );
}
