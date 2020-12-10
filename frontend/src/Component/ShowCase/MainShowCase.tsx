import React from "react";
import { useParams } from "react-router-dom";
import productdata from "./productdata.json";

import "./MainShowCase.scss";
import { useAddToCartMutation, useMeQuery } from "../../generated/graphql";

interface ParamTypes {
  category: string;
}
interface ProductTypes {
  id: number;
  name: string;
  url: string;
  price: string;
}
export default function MainShowcase() {
  const [addToCart] = useAddToCartMutation();

  let { category } = useParams<ParamTypes>();

  if (!productdata[category]) {
    category = "clothings";
  }

  const productDataOnSelectectedCategory = productdata[category];
  return (
    <div className="main-showcase">
      {productDataOnSelectectedCategory.map(
        ({ id, name, url, price }: ProductTypes) => (
          <div
            className="card"
            key={id}
            style={{ backgroundImage: `url(${url})` }}
            onClick={async () => {
              try {
                await addToCart({
                  variables: {
                    name,
                    price,
                    username: "cjay",
                  },
                });
              } catch (error) {
                console.error(error);
              }
            }}
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
