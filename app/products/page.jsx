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

      {data.map(({ name, description, price }, i) => {
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

async function getData() {
  let res = await fetch(`${process.env.HOST_URI}/api/products`, {
    cache: "no-cache",
  });
  // console.log(process.env.HOST_URI);

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
