"use client";

import {
  Button,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CautionAlertDialog from "../components/AlertDialogue";
import { MdDelete, MdEdit } from "react-icons/md";
import Link from "next/link";

const initialValues = {
  name: "",
  parent: null,
};
export default function Categories() {
  const router = useRouter();
  const [editedCategory, setEditedCategory] = useState(null);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, ...(parent && { parent }) };
    axios.post("api/category", data).then(({ data }) => {
      setName("");
      setParent("");
      router.refresh();
    });
  };

  const handleEdit = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParent(category.parent?._id || "");
  };

  return (
    <>
      <Text
        className="text-blue-900 text-3xl font-bold mb-2 flex items-center gap-2"
        as="h1"
      >
        Categories
      </Text>
      <Text
        className="text-blue-900 text-lg mb-2 flex items-center gap-2"
        as="h1"
      >
        {editedCategory ? "Edit Category" : "Add New Category"}
      </Text>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-6">
        <Input
          value={name}
          placeholder="Category Name"
          onChange={(e) => setName(e.target.value)}
          className="focus:border-blue-900 border-gray-200"
          sx={{
            "& ~ .chakra-select__wrapper": {
              flexBasis: "33.333333%",
            },
          }}
        />
        <Select onChange={(e) => setParent(e.target.value)} value={parent}>
          <option value="">Select category</option>
          {categories?.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </Select>
        <Button type="submit" className="bg-blue-900 text-white basis-2/12">
          Save
        </Button>
      </form>

      <TableContainer className="mx-auto justify-center">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Parent</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories?.map((category) => {
              const { name, parent, _id } = category;
              return (
                <Tr key={_id}>
                  <Td>{name}</Td>
                  <Td>{parent?.name}</Td>
                  <Td>
                    <div className="flex space-x-2">
                      <Button
                        leftIcon={<MdEdit />}
                        onClick={() => handleEdit(category)}
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
    </>
  );
}
