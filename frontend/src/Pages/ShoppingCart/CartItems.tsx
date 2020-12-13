import React, { ReactElement } from "react";
import { useCartListQuery } from "src/generated/graphql";
import { useRemoveFromCartMutation, useMeQuery } from "../../generated/graphql";

export default function CartItems(): ReactElement {
  const { data } = useCartListQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const username = useMeQuery().data?.me?.username;
  if (data?.cartList === null || data?.cartList?.length === 0) {
    return (
      <div className="cart-center">
        <h2>There's no item in this Cart</h2>
        {data.cartList === null && <p>Try to login your account.</p>}
      </div>
    );
  }
  return (
    <div className="cart-item-wrapper">
      {data?.cartList!.map(({ id, name, price, url }) => (
        <div className="cart-item" key={id}>
          <div
            className="cart-thumbnail"
            style={{ backgroundImage: `url(${url})` }}
          ></div>
          <div className="cart-name">{name}</div>
          <div className="cart-price">${price}</div>
          <div
            className="remove"
            onClick={async () => {
              await removeFromCart({
                variables: {
                  id: id!,
                  username: username!,
                },
                update: (cache) => {
                  cache.evict({ id: `CartList:${id}` });
                },
              });
            }}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </div>
        </div>
      ))}
    </div>
  );
}
