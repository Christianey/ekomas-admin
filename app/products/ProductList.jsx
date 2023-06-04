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
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export default function ProductList({ products }) {
  const handleClick = async (id) => {
    const res = await axios.delete("/api/products/");
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
                    <Button
                      leftIcon={<MdDelete />}
                      className="bg-red-700 text-white"
                      onClick={() => handleClick(_id)}
                    >
                      Delete
                    </Button>
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
