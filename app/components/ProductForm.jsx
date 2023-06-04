"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input, Textarea, FormLabel, Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

let inputClasses = "focus:border-blue-900 border-gray-200 mb-2";

export default function ProductForm({ name, description, price }) {
  console.log("form rerendering");
  console.log({ name, description, price });
  const router = useRouter();
  const toast = useToast();
  const formRef = useRef();
  const [formValues, setFormValues] = useState({
    name: name || "",
    description: description || "",
    price: price || 0,
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formValues);
      toast({
        title: "Product Created Successfully",
        status: "success",
        duration: 2000,
        position: "top",
      });
      router.refresh();
      router.replace("/products");
    } catch (error) {
      toast({
        title: "Something went wrong, please try again.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
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
