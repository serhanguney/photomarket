import Head from "next/head";
import ProductList from "../components/ProductList/ProductList";
import { server } from "../config/index";

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api`);
  const products = await res.json();

  return {
    props: {
      products: products.products,
    },
  };
};

export default function Home({ products }) {
  return (
    <div className="container">
      <Head>
        <title>Bejamas Recruitment</title>
        <meta name="description" content="A premium photography marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductList products={products} />
    </div>
  );
}
