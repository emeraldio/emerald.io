import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="emerald" />
        <meta name="image" content="https://emerald.io/preview.jpg" />
        <meta name="og:image" content="https://emerald.io/preview.jpg" />
        <meta name="description" content="internet toy factory" />
        <meta name="og:description" content="internet toy factory" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
