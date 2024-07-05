import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/Product/[productid]/productDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const calculateOrderAmount = (items: CartProductType[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { items, payment_intent_id } = body;

    const total = calculateOrderAmount(items) * 100; // Convert to cents
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: "usd",
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId: payment_intent_id,
      products: items,
    };

    // Create a description for the payment intent
    const description = items
      .map((item: any) => `${item.name} (${item.quantity}x)`)
      .join(", ");

    if (payment_intent_id) {
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: total,
            description, // Add description here
          }
        );

        // Ensure that the order is updated only once
        const existing_order = await prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        });

        if (!existing_order) {
          await prisma.order.create({ data: orderData });
        } else {
          await prisma.order.update({
            where: { paymentIntentId: payment_intent_id },
            data: { amount: total, products: items },
          });
        }
        return NextResponse.json({ paymentIntent: updated_intent });
      }
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        description,
      });

      orderData.paymentIntentId = paymentIntent.id;
      await prisma.order.create({ data: orderData });
      return NextResponse.json({ paymentIntent });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
