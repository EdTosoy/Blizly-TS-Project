import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { ReactElement } from "react";
import CheckOut from "./CheckOut";

interface Props {
  numberOfItems: number | undefined;
  total: number;
}

export default function CheckOutWrapper({
  numberOfItems,
  total,
}: Props): ReactElement {
  const stripePromise = loadStripe(
    "pk_test_51I0hdrLCnusGqFH6e9hxxFjBrXzIxXt0aaNkkNdUuK2RsZT8pHG3Q0jRUMKxAXlc4I46Naf1mQozk7No9Gw7BDG600wLMVJLTO"
  );
  return (
    <Elements stripe={stripePromise}>
      <CheckOut numberOfItems={numberOfItems} total={total} />
    </Elements>
  );
}
