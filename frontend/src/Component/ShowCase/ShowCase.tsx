import React from "react";

import "./ShowCase.scss";
import LeftNav from "./LeftNav";
import MainShowcase from "./MainShowCase";

export default function ShowCase() {
  return (
    <div className="show-case">
      <LeftNav />
      <MainShowcase />
    </div>
  );
}
