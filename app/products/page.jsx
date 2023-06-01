import Link from "next/link";
import React from "react";
import axios from "axios";

export default async function Products() {
  const { data } = await getData();

  return (
    <>
      <Link
        className="bg-blue-700 text-white p-3 rounded-md"
        href={"/products/new"}
      >
        Add new product
      </Link>

      {data.map(({ name, description, price }) => {
        return (
          <div className="flex justify-between">
            <div>{name}</div>
            <div>{description}</div>
            <div>{price}</div>
          </div>
        );
      })}
    </>
  );
}

async function getData() {
  let res = await fetch("http://127.0.0.1:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
