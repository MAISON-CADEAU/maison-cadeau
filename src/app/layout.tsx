import type { Metadata } from "next";
import "@/styles/globals.scss";

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
      <body>{children}</body>
    </html>
  );
}
