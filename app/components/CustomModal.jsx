import { Children, cloneElement, isValidElement } from "react";

const {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} = require("@chakra-ui/react");

export default function CustomModal({
  children,
  buttonText,
  size,
  buttonProps,
  fontSize,
  px,
  py,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      <Button
        onClick={onOpen}
        {...buttonProps}
        fontSize={fontSize || "16px"}
        px={px}
      >
        {buttonText}
      </Button>
      <Modal size={size} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
        />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton
            fontSize="20px"
            mt={5}
            mr={5}
            _focus={{ borderBox: "none" }}
          />
          <ModalBody
            px={px || 8}
            py={{ base: py || 6, md: py || 4, lg: py || 6 }}
          >
            {childrenWithProps}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
