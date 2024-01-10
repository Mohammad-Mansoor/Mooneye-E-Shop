import Container from "@/app/components/Container";
import { product } from "@/utilities/product";
import ProductDetails from "./productDetails";
interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: Iprams }) => {
  product;
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
