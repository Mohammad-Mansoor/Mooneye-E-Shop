import Image from "next/image";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import { products } from "@/utilities/products";
import { truncate } from "@/utilities/truncut";
import ProductCard from "./components/products/productCard";
import getProducts, { IProductParams } from "@/actions/getProdcuts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products?.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters' />
    );
  }

  //fisher-Yates shuffle algorithm
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {shuffledProducts.map((product: any) => {
            return <ProductCard data={product} key={product.id} />;
          })}
        </div>
      </Container>
    </div>
  );
}
