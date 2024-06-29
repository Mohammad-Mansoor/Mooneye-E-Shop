import Container from "../components/Container";
import CartClient from "./CartClient";

import { getCurrentUser } from "@/actions/getCurrentUser";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
        {/* <h1>tis asdkf;asjfd</h1> */}
      </Container>
    </div>
  );
};

export default Cart;
