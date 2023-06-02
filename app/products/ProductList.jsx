"use client"

import React from "react";

export default function ProductList({ products }) {
  return (
    <>
      {products?.map(({ name, description, price }, i) => {
        return (
          <div className="flex justify-between" key={i}>
            <div>{name}</div>
            <div>{description}</div>
            <div>{price}</div>
          </div>
        );
      })}
    </>
  );
}
