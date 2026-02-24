import type { Metadata } from "next";
import { Literata, Luxurious_Script } from "next/font/google";
import "@/styles/globals.scss";

const literata = Literata({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const luxuriousScript = Luxurious_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luxurious-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAISON CADEAU - 센스 있는 선물 큐레이션",
  description: "AI 기반 선물 추천, 트렌디한 선물 피드, 스크랩 기능을 제공하는 선물 큐레이션 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${literata.variable} ${luxuriousScript.variable}`}>{children}</body>
    </html>
  );
}
