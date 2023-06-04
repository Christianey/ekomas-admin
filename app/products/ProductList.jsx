"use client";

import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import CautionAlertDialog from "../components/AlertDialogue";
import { useRouter } from "next/navigation";

export default function ProductList({ products }) {
  const toast = useToast()
  const router = useRouter()
  const toastConstants = {
    status: "success",
    duration: 2000,
    position: "top",
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products?id=${id}`);
      toast({
        ...toastConstants,
        title: "Product Deleted Successfully",
      });
      router.refresh();
      router.replace("/products");
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong, please try again.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th isNumeric>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => {
            const { name, description, price, _id } = product;
            return (
              <Tr key={_id}>
                <Td>{name}</Td>
                <Td>{description}</Td>
                <Td isNumeric>{price}</Td>
                <Td>
                  <div className="flex space-x-2">
                    <Button
                      as={Link}
                      leftIcon={<MdEdit />}
                      href={`/products/edit/${_id}`}
                    >
                      Edit
                    </Button>
                    <CautionAlertDialog
                      buttonProps={{
                        leftIcon: <MdDelete />,
                        className: "bg-red-700 text-white",
                      }}
                      cautionTitle={"Are you sure you want to delete?"}
                      buttonText={"Delete"}
                      onContinue={() => {
                        handleDelete(_id);
                      }}
                    />
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
