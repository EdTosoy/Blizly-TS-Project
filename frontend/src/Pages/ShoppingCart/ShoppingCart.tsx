import React, { useState } from "react";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

import "./ShoppingCart.scss";
import CheckOutWrapper from "./CheckOutWrapper";
import { useCartListQuery } from "src/generated/graphql";

export default function ShoppingCart() {
  const [CheckOutPage, setCheckOutPage] = useState(false);
  const { data } = useCartListQuery();
  const numberOfItems = data?.cartList?.length;
  let total: number = 0;
  data?.cartList?.map(({ price }) => (total += parseInt(price!)));
  return (
    <div className="shopping-cart">
      <div className="shopping-cart-content">
        <div className="cart-items">
          <h2>Your Cart</h2>
          <CartItems />
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {CheckOutPage ? (
            <CheckOutWrapper numberOfItems={numberOfItems} total={total} />
          ) : (
            <CartSummary setCheckOutPage={setCheckOutPage} numberOfItems={numberOfItems} total={total} />
          )}
        </div>
      </div>
    </div>
  );
}
