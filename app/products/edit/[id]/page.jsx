"use client";

import GoBack from "@/app/components/GoBack";
import ProductForm from "@/app/components/ProductForm";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EditProduct({ params: { id } }) {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    if (!id || productInfo?.name) return;

    axios.get(`/api/products?id=${id}`).then(({ data: { data } }) => {
      setProductInfo(data);
    });
  }, [productInfo, id]);

  return (
    <div>
      <Text className="text-blue-900 text-xl font-bold mb-2 flex items-center gap-2" as="h1">
        <GoBack />
        Edit Product
      </Text>
      {productInfo && <ProductForm {...productInfo} />}
      {!productInfo && <ProductForm />}
    </div>
  );
}
