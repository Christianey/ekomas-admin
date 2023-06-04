"use client";

import { Text } from "@chakra-ui/react";
import ProductForm from "../../components/ProductForm";

export default function NewProduct() {
  return (
    <>
      <Text className="text-blue-900 text-xl font-bold mb-2" as="h1">
        New Product
      </Text>
      <ProductForm formAction={createProduct} />
    </>
  );
}

async function createProduct(formValues) {
  let res = await fetch("/api/products", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formValues),
  });

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
