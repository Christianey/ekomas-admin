import Link from "next/link";
import React from "react";
import ProductList from "./ProductList";

export default async function Products() {
  const { data } = await getData();

  return (
    <>
      <Link
        className="bg-blue-700 text-white p-3 rounded-md inline-block"
        href={"/products/new"}
      >
        Add new product
      </Link>
      <ProductList products={data} />
    </>
  );
}

async function getData() {
  let res = await fetch(
    `${process.env.HOST_URI}/api/products`
    // , {
    // cache: "no-cache",
    // }
  );

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
