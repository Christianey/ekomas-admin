"use client";

import React, { useRef, useState } from "react";
import {
  Input,
  Textarea,
  Text,
  FormLabel,
  Button,
  Form,
} from "@chakra-ui/react";
import axios from "axios";

let inputClasses = "focus:border-blue-900 border-gray-200 mb-2";

export default function NewProduct() {
  const formRef = useRef();
  const [formValues, setFormValues] = useState({
    name: "1",
    description: "1",
    price: 2,
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    // console.log(formRef.current.reportValidity());

    await axios.post("/api/products", formValues);
  };

  return (
    <form ref={formRef} onSubmit={createProduct}>
      <Text className="text-blue-900 text-xl font-bold mb-2" as="h1">
        New Product
      </Text>
      <FormLabel>Product Name</FormLabel>
      <Input
        name="name"
        value={formValues.name}
        placeholder="Product Name"
        onChange={handleChange}
        className={inputClasses}
      />
      <FormLabel>Product Description</FormLabel>
      <Textarea
        name="description"
        value={formValues.description}
        onChange={handleChange}
        placeholder="Product Description"
        className="inputClasses"
      />
      <FormLabel>Price in USD</FormLabel>
      <Input
        name="price"
        value={formValues.price}
        onChange={handleChange}
        type="number"
        placeholder="Product Name"
        className={inputClasses}
        min={1}
      />
      <Button type="submit" className="bg-blue-900 text-white">
        Save
      </Button>
    </form>
  );
}
