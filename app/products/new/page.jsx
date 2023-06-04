"use client";

import { Text } from "@chakra-ui/react";
import ProductForm from "../../components/ProductForm";

export default function NewProduct() {
  return (
    <>
      <Text className="text-blue-900 text-xl font-bold mb-2" as="h1">
        New Product
      </Text>
      <ProductForm />
    </>
  );
}
