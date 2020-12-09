import React from "react";
import { useParams } from "react-router-dom";
import productdata from "./productdata.json";

import "./MainShowCase.scss";
export default function MainShowcase() {
  interface ParamTypes {
    category: string;
  }
  interface ProductTypes {
    id: number;
    name: string;
    url: string;
    price: string;
  }
  let { category } = useParams<ParamTypes>();
  const productDataOnSelectectedCategory = productdata[category];
  return (
    <div className="main-showcase">
      {productDataOnSelectectedCategory.map(
        ({ id, name, url, price }: ProductTypes) => (
          <div
            className="card"
            key={id}
            style={{ backgroundImage: `url(${url})` }}
          >
            <div className="product-info">
              <h2>{name}</h2>
              <p>${price}.00</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
