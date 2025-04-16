import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Иконка для iOS / Android */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        {/* Цвет для адресной строки на Android */}
        <meta name="theme-color" content="#0284c7" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
