import Document, { Html, Head, Main, NextScript } from "next/document";

//to fix the chrome bug with css transitions running on initial load we add an empty script tag here
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script> </script>
        </body>
      </Html>
    );
  }
}
