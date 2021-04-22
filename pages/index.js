import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList/ProductList";
import data from "../data.json";

export default function Home() {
  const { products } = data;
  const imageLCP =
    "https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=500&w=800";

  return (
    <div id="homepage">
      <Head>
        <title>Bejamas Recruitment</title>
        <meta name="description" content="A premium photography marketplace" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          href={imageLCP}
          imagesrcset={`${imageLCP} 1200w,${imageLCP}?w=200 200w,${imageLCP}?w=400 400w,${imageLCP}?w=800 800w,${imageLCP}?w=1024 1024w`}
          as="image"
        />
      </Head>
      <Featured products={products} />
      <ProductList products={products} />
    </div>
  );
}
