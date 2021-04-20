import Layout from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import Overlay from "../components/Overlay";
import Context from "../components/Context";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Context>
        <Navbar />
        <Overlay />
        <Component {...pageProps} />
      </Context>
    </Layout>
  );
}

export default MyApp;
