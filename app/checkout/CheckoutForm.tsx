"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utilities/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formatedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });
      if (!result.error) {
        toast.success("Payment Successfully done");
        handleClearCart();
        handleSetPaymentSuccess(true);
        handleSetPaymentIntent(null);
      } else {
        toast.error(result.error.message || "Payment failed");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred during payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6 ">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "AF"] }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-2xl font-bold ">
        Total: {formatedPrice}
      </div>
      <Button
        lable={isLoading ? "Processing..." : "Pay Now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
