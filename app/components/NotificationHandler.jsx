"use client";

import { Progress, Flex, Text, createStandaloneToast } from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";
// import theme from "../theme";

const { toast } = createStandaloneToast();
// { theme }
export const errorNotifier = (errorMessage) => {
  return toast({
    title: "Error",
    description:
      typeof errorMessage === "string" ? errorMessage : "SOMETHING WENT WRONG",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};

export const successNotifier = (info) => {
  return toast({
    title: "Success",
    description: info,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

export const fileUploadNotifier = (toastRef) => {
  return toast({
    duration: null,
    isClosable: false,
    position: "top",
    render: (id) => {
      toastRef.current = id;
      return (
        <Flex
          bg="#6C4097"
          p={4}
          borderRadius="md"
          gridGap={3}
          alignItems="center"
        >
          <AiFillInfoCircle color="white" />
          <Flex direction="column" flexGrow={1}>
            <Text color="white" fontWeight="bold" mb={2}>
              Importing Contacts
            </Text>
            <Progress
              size="xs"
              sx={{
                "&": {
                  background: "white",
                  "& > *": {
                    background: "#6C4097",
                  },
                },
              }}
              isIndeterminate
            />
          </Flex>
        </Flex>
      );
    },
  });
};
