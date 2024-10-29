import "./globals.css";
import localFont from "next/font/local";
import { Base } from "./Base";
import { SessionWrapperLayout } from "./SessionWrapperLayout";

const geistInter = localFont({
  src: [
    {
      path: "./fonts/Inter-Thin.woff",
      style: "normal",
      weight: "100"
    },
    {
      path: "./fonts/Inter-ExtraLight.woff",
      style: "normal",
      weight: "200"
    },
    {
      path: "./fonts/Inter-Light.woff",
      style: "normal",
      weight: "300"
    },
    {
      path: "./fonts/Inter-Regular.woff",
      style: "normal",
      weight: "400"
    },
    {
      path: "./fonts/Inter-Medium.woff",
      style: "normal",
      weight: "500"
    },
    {
      path: "./fonts/Inter-SemiBold.woff",
      style: "normal",
      weight: "600"
    },
    {
      path: "./fonts/Inter-Bold.woff",
      style: "normal",
      weight: "700"
    },
    {
      path: "./fonts/Inter-ExtraBold.woff",
      style: "normal",
      weight: "800"
    },
    {
      path: "./fonts/Inter-Black.woff",
      style: "normal",
      weight: "900"
    },
  ]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistInter.className}`}>
        <SessionWrapperLayout>
          <Base>
            {children}
          </Base>
        </SessionWrapperLayout>
      </body>
    </html>
  );
}
