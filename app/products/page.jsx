import Link from "next/link";
import React from "react";

export default function Products() {
  return (
    <>
      <Link
        className="bg-blue-700 text-white p-3 rounded-md"
        href={"/products/new"}
      >
        Add new product
      </Link>
    </>
  );
}
