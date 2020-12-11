import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuContext } from "../../ShopContext/menuContext";

import "./User.scss";
import MenuPanel from "./MenuPanel";
import { setAccessToken } from "src/accessToken";
import { useMeQuery, useLogoutMutation } from "src/generated/graphql";

export default function User() {
  const { menuOpen, setMenuOpen } = useContext(MenuContext);
  const handleClick = () => {
    console.log(menuOpen);
    setMenuOpen((preValue) => !preValue);
  };

  let history = useHistory();
  const { data } = useMeQuery({
    fetchPolicy: "network-only",
  });
  console.log(data);
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await logout();
    setAccessToken("");
    await client.resetStore();
    history.push("/user/SignIn");
    window.location.reload();
  };

  return (
    <div className="user">
      <Link to="/cart">
        <div className="cart">
          <ion-icon name="cart-outline"></ion-icon>
        </div>
      </Link>
      <Link to="/auth">
        {data?.me! === null ? (
          <ion-icon name="person-outline"></ion-icon>
        ) : (
          <ion-icon name="exit-outline" onClick={handleLogout}></ion-icon>
        )}
      </Link>
      <div onClick={handleClick} className="menu">
        <ion-icon name="grid-outline"></ion-icon>
        <MenuPanel menuOpen={menuOpen} />
      </div>
    </div>
  );
}
