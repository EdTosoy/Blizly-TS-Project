import React from "react";
import ShowCase from "src/Component/ShowCase/ShowCase";

import Hero from "../Home/Hero";
import "./Shopping.scss";
export default function Shopping() {
  return (
    <div className="shopping">
      <Hero />
      <ShowCase />
    </div>
  );
}
