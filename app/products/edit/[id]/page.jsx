"use client";

import ProductForm from "@/app/components/ProductForm";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditProduct({ params: { id } }) {
  console.log("edit rerendering");

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id || productInfo?.name) return;

    axios.get(`/api/products?id=${id}`).then(({ data: { data } }) => {
      setProductInfo(data );
    });
  }, [productInfo]);

  console.log({ productInfo });

  return (
    <div>
      <Text className="text-blue-900 text-xl font-bold mb-2" as="h1">
        Edit Product
      </Text>
      {productInfo && <ProductForm {...productInfo} />}
      {!productInfo && <ProductForm />}
    </div>
  );
}
