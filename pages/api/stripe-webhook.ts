import { buffer } from "micro";
import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"; // Ensure you import prisma instance

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "charge.succeeded": {
      const charge = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        try {
          const existingOrder = await prisma.order.findFirst({
            where: { paymentIntentId: charge.payment_intent },
          });

          if (existingOrder) {
            await prisma.order.update({
              where: { paymentIntentId: charge.payment_intent },
              data: {
                status: "complete",
                address: charge.shipping?.address || {},
              },
            });
          } else {
            console.warn(
              "Order not found for payment intent:",
              charge.payment_intent
            );
          }
        } catch (error) {
          console.error("Error updating order:", error);
          return res.status(500).send("Error updating order");
        }
      } else {
        console.warn("Charge does not have a valid payment_intent.");
        return res.status(400).send("Invalid payment_intent in charge object");
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
      break;
  }

  res.status(200).json({ received: true });
}
