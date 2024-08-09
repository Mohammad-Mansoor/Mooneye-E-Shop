import Container from "@/app/components/Container";
// import { product, product } from "@/utilities/product";
import { products } from "@/utilities/products";
import ProductDetails from "./productDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
interface IPrams {
  productid?: string;
}

const Product = async ({ params }: { params: IPrams }) => {
  const product = await getProductById({ productId: params.productid });

  if (!product)
    return <NullData title="Oops! Product with the given id does not exist" />;
  // const product = products.find((item) => item.id === params.productid);
  // console.log("this is single product", product);
  // console.log("this is params data", params);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div>add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
