import Container from "@/app/components/Container";
import ManageProductClient from "./ManageProductsClient";
import getProducts from "@/actions/getProdcuts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { product } from "@/utilities/product";
import { now } from "moment";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });

  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied" />;
  }
  console.log(products, "this is product console log !!!");
  return (
    <div className="pt-8">
      <Container>
        <ManageProductClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
