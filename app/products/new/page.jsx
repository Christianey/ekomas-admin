"use client";

import { Text } from "@chakra-ui/react";
import ProductForm from "../../components/ProductForm";
import GoBack from "@/app/components/GoBack";

export default function NewProduct() {
  return (
    <>
      <Text
        className="text-blue-900 text-xl font-bold mb-2 flex items-center gap-2"
        as="h1"
      >
        <GoBack />
        New Product
      </Text>
      <ProductForm />
    </>
  );
}
