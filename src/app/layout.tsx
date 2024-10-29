import "./globals.css";
import localFont from "next/font/local";
import { Base } from "./Base";
import { SessionWrapperLayout } from "./SessionWrapperLayout";

const geistInter = localFont({
  src: "./fonts/Inter-Regular.woff",
  variable: "--font-geist-inter",
  // weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistInter.variable}`}>
        <SessionWrapperLayout>
          <Base>
            {children}
          </Base>
        </SessionWrapperLayout>
      </body>
    </html>
  );
}
