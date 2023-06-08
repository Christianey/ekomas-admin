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
  const [editCategory, setEditCategory] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);

  const [selectOptions, setSelectOptions] = useState([]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    axios.get("/api/category").then(({ data }) => {
      setSelectOptions(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("api/category", formValues).then(({ data }) => {
      setFormValues(initialValues);
      router.refresh();
    });
  };

  const handleEdit = (category) => {
    setEditCategory(true);
    setFormValues(category);
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
        {editCategory ? "Edit Category" : "Add New Category"}
      </Text>

      <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-6">
        <Input
          name="name"
          value={formValues.name}
          placeholder="Category Name"
          onChange={handleChange}
          className="focus:border-blue-900 border-gray-200"
          sx={{
            "& ~ .chakra-select__wrapper": {
              flexBasis: "16.666667%",
            },
          }}
        />
        <Select onChange={handleChange} className="basis-2/12" name="parent">
          <option key={"parent"} value={null}>
            Select Parent Category
          </option>
          {selectOptions?.map((option) => {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
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
            {selectOptions?.map((category) => {
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
