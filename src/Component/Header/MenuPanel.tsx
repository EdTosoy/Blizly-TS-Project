import React from "react";
import "./MenuPanel.scss";

interface Props {
  menuOpen: Boolean;
}

export default function MenuPanel({ menuOpen }: Props) {
  const menuStyle = menuOpen ? { display: "block" } : { display: "none" };
  return (
    <div className="menuPanel-nav" style={menuStyle}>
      <li>
        <a href="/shopping/clothings">Clothing</a>
      </li>
      <li>
        <a href="/shopping/shoes">Shoes</a>
      </li>
      <li>
        <a href="/shopping/bags">Bags</a>
      </li>
      <li>
        <a href="/shopping/watches">Watches</a>
      </li>
      <li>
        <a href="/shopping/accessories">Accessories</a>
      </li>
    </div>
  );
}
