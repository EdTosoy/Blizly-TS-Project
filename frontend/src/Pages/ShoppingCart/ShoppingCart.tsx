import React from "react";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

import "./ShoppingCart.scss";

export default function ShoppingCart() {
  return (
    <div className="shopping-cart">
      <div className="shopping-cart-content">
        <div className="cart-items">
          <h2>Your Cart</h2>
          <CartItems />
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
