import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuContext } from "../../ShopContext/menuContext";

import "./User.scss";
import MenuPanel from "./MenuPanel";
import { setAccessToken } from "src/accessToken";
import { useMeQuery, useLogoutMutation } from "src/generated/graphql";
import { useCartListQuery } from "../../generated/graphql";

export default function User() {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);
  const { data } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const [logout, { client }] = useLogoutMutation();
  let history = useHistory();

  const handleClick = () => {
    console.log(menuOpen);
    setMenuOpen((preValue) => !preValue);
  };

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await logout();
    setAccessToken("");
    await client.resetStore();
    history.push("/auth");
    window.location.reload();
  };
  const cartLength = useCartListQuery().data?.cartList?.length;

  return (
    <div className="user">
      <a href="/cart">
        <div className="cart">
          <ion-icon name="cart-outline"></ion-icon>
          {cartLength ? <div className="circle"></div> : " "}
        </div>
      </a>
      <a href="/auth">
        {data?.me! === null ? (
          <ion-icon name="person-outline"></ion-icon>
        ) : (
          <ion-icon name="exit-outline" onClick={handleLogout}></ion-icon>
        )}
      </a>
      <div onClick={handleClick} className="menu">
        <ion-icon name="grid-outline"></ion-icon>
        <MenuPanel menuOpen={menuOpen} />
      </div>
    </div>
  );
}
