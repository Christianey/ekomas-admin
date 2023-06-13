"use client";

import {
  Box,
  Button,
  Flex,
  FormLabel,
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
import {
  errorNotifier,
  successNotifier,
} from "../components/NotificationHandler";

export default function Categories() {
  const router = useRouter();
  const [editedCategory, setEditedCategory] = useState(false);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (categories.length > 0) return;
    axios.get("/api/category").then(({ data }) => {
      setCategories(data);
    });
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { name, ...(parent && { parent }) };
    axios.post("api/category", data).then(({ data }) => {
      setName("");
      setParent("");
      successNotifier("Category Added Successfully");
      router.refresh();
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/category?id=${id}`);
      successNotifier("Category Deleted Successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      errorNotifier();
    }
  };

  const handleEdit = (category) => {
    setEditedCategory(true);
    setName(category.name);
    setParent(category.parent?._id || "");
  };

  const addProperty = () => {
    setProperties([...properties, { name: "", values: "" }]);
  };

  const removeProperty = (removeIndex) => {
    return setProperties(
      properties.filter((_, index) => removeIndex !== index)
    );
  };

  const handlePropertyChange = (index, inputName, newValue) => {
    const changedProperties = [...properties];
    properties[index][inputName] = newValue;
    setProperties(changedProperties);
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
        {editedCategory && (
          <Button
            onClick={() => {
              setName("");
              setParent("");
              setEditedCategory(false);
            }}
            className="bg-red-700 text-white basis-2/12"
          >
            Cancel
          </Button>
        )}
      </form>

      <FormLabel>Properties</FormLabel>
      <Button
        size="sm"
        onClick={addProperty}
        className="bg-blue-900 mb-2"
        color="white"
      >
        Add new Property
      </Button>
      <Box mb={2}>
        {properties.length > 0 &&
          properties.map((property, index) => {
            return (
              <Flex gap="1" mb={2} key={index}>
                <Input
                  onChange={(ev) =>
                    handlePropertyChange(index, "name", ev.target.value)
                  }
                  value={property.name}
                  placeholder="property eg. color"
                />
                <Input
                  onChange={(ev) =>
                    handlePropertyChange(index, "values", ev.target.value)
                  }
                  value={property.values}
                  placeholder="Values (comma separated)"
                />
                <Button
                  onClick={() => {
                    removeProperty(index);
                  }}
                  className="bg-red-700 text-white basis-2/12"
                >
                  Remove
                </Button>
              </Flex>
            );
          })}
      </Box>

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
