import { useRouter } from "next/navigation";
import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";

export default function GoBack() {
  const navigation = useRouter();

  return (
    <MdKeyboardBackspace
      onClick={navigation.back}
      className="text-blue-900 cursor-pointer"
    />
  );
}
