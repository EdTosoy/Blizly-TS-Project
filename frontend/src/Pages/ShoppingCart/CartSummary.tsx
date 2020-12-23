import React, { ReactElement } from "react";
import { useMeQuery } from "../../generated/graphql";
interface Props {
  setCheckOutPage: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfItems: number | undefined;
  total: number;
}

export default function CartSummary({
  setCheckOutPage,
  numberOfItems,
  total,
}: Props): ReactElement {
  const me = useMeQuery();

  return (
    <>
      <div className="row">
        <input type="text" placeholder="Shop Voucher" />
        <button>Submit</button>
      </div>
      <div className="row">
        <p>
          Quantity : <span>{numberOfItems} items </span>
        </p>
        <p>
          Total : <span>${total} </span>
        </p>
      </div>
      <button
        className="btn-primary"
        onClick={() => {
          if (me.data?.me?.username) {
            setCheckOutPage(true);
          }
        }}
      >
        Proceed to Payment
      </button>
    </>
  );
}
