import React from "react";
import LeftNav from "src/Component/ShowCase/LeftNav";
import productData from "src/Component/ShowCase/productdata.json";

export default function SampleShowcase() {
  interface DataTypes {
    id: number;
    name: string;
    url: string;
    price: string;
  }
  return (
    <div className="show-case">
      <div className="showcase-heading">
        <div>
          <h2>Mens Trending Products</h2>
          <p>our most trending products for men.</p>
        </div>
        <div>
          <a href="/shopping/clothings">Show All Products</a>
        </div>
      </div>
      <LeftNav />
      <div className="main-showcase">
        {productData.clothings.map(({ id, name, url, price }: DataTypes) => (
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
        ))}
      </div>
    </div>
  );
}
