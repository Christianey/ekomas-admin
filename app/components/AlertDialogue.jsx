import React from "react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export default function CautionAlertDialog({
  onContinue,
  loading,
  buttonText,
  cautionTitle,
  agree,
  disagree,
  buttonProps,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const BTN = { _focus: { boxShadow: "none" }, color: "white" };

  const handleClick = () => {
    onClose();
    onContinue(true);
  };

  return (
    <>
      <Button
        _focus={{ boxShadow: "none" }}
        _hover={{ bg: "none" }}
        onClick={onOpen}
        isLoading={loading}
        {...buttonProps}
      >
        {buttonText}
      </Button>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />

        <AlertDialogContent>
          <AlertDialogHeader>{cautionTitle}</AlertDialogHeader>

          <AlertDialogFooter>
            <Button
              {...BTN}
              className="bg-red-700 :hover:bg-red-700"
              ref={cancelRef}
              onClick={onClose}
            >
              {disagree || "No"}
            </Button>
            <Button
              className="bg-blue-900"
              {...BTN}
              onClick={handleClick}
              ml={3}
            >
              {agree || "Yes"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
