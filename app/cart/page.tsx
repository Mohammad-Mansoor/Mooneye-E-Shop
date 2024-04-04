"use client";

import CartProvider from "@/providers/CartProvider";
import Container from "../components/Container";
import CartClient from "./CartClient";
import { CartContext, useCart } from "@/hooks/useCart";
import { useContext } from "react";

const Cart = () => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
        {/* <h1>tis asdkf;asjfd</h1> */}
      </Container>
    </div>
  );
};

export default Cart;
