import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { useCartListQuery, useChargeMutation } from "src/generated/graphql";

interface Props {
  numberOfItems: number | undefined;
  total: number;
}
export default function CheckOut({
  numberOfItems,
  total,
}: Props): ReactElement {
  const [charge] = useChargeMutation();
  let history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [onProcess, setOnProcess] = useState(false);

  //@ts-ignore
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOnProcess(true);
    if (stripe && elements) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card")!,
      });
      if (error) console.error(error);
      if (paymentMethod?.id) {
        setOnProcess(false);
        const { id } = paymentMethod;
        try {
          await charge({
            variables: {
              id,
              amount: total! * 100,
            },
          });
          history.push("/");
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#00052e",
        "::placeholder": {
          color: "#00052e",
        },
      },
      invalid: {
        color: "#DC143C",
      },
      complete: {
        iconColor: "#0000A0",
      },
    },
    hidePostalCode: true,
  };
  return (
    <>
      <div className="row">
        <input type="text" placeholder="Name" />
      </div>
      <div className="row">
        <input type="email" placeholder="Email" />
      </div>
      <div className="row">
        <input type="text" placeholder="Complete Address" />
      </div>
      <div className="row">
        <p>
          Quantity : <span>{numberOfItems} items </span>
        </p>
        <p>
          Total : <span>${total} </span>
        </p>
      </div>
      <div className="card-element">
        <CardElement options={cardElementOptions} />
      </div>

      <button
        className="btn-primary"
        disabled={onProcess}
        onClick={handleSubmit}
      >
        {onProcess ? "Processing..." : "Pay"}
      </button>
    </>
  );
}
