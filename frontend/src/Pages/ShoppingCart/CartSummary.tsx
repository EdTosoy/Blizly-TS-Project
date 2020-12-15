import React, { ReactElement } from "react";
import { useCartListQuery } from "../../generated/graphql";

export default function CartSummary(): ReactElement {
  const { data } = useCartListQuery();
  const numberOfItems = data?.cartList?.length;
  let total: number = 0;
  data?.cartList?.map(({ price }) => (total += parseInt(price!)));

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
      <button className="btn-primary">
        <a href="/auth">Proceed to Payment</a>
      </button>
    </>
  );
}
