import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "showmecode | 学习 VibeCoding，设计你自己的产品",
  description:
    "免费的文档教程网站，帮助你从基础入门 VibeCoding，掌握 AI 编程与产品设计，快速将想法变成可用的产品。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}

