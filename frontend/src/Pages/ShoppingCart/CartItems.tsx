import React, { ReactElement } from "react";
import { useCartListQuery } from "src/generated/graphql";

export default function CartItems(): ReactElement {
  const { data } = useCartListQuery();
  if (data?.cartList === null) {
    return (
      <div className="cart-center">
        <h2>There's no item in this Cart</h2>
        <p>Try to login your account.</p>
      </div>
    );
  }
  return (
    <div className="cart-center">
      {data?.cartList!.map(({ id, name, price }) => (
        <div className="cart-item" key={id}>
          <div className="cart-name">{name}</div>
          <div className="cart-price">{price}</div>
        </div>
      ))}
    </div>
  );
}
