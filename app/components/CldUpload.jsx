import {useState} from "react"
import { CldUploadWidget } from "next-cloudinary";
import { BsUpload } from "react-icons/bs";

export default function CldUpload({ setFormValues, formValues, buttonText = "Upload" }) {
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleUpload = ({ event, info }) => {
    if (event === "success") {
      setUploadedImages([...uploadedImages, info.secure_url]);
    }
  };

  return (
    <CldUploadWidget
      onError={() => {
        return;
      }}
      onClose={() => {
        setFormValues({ ...formValues, images: uploadedImages });
      }}
      uploadPreset="wvcmcbnx"
      onUpload={handleUpload}
      options={{
        maxFiles: 3,
        multiple: true,
        clientAllowedFormats: ["image"],
        sources: ["local", "google_drive", "unsplash", "instagram", "camera"],
        showUploadMoreButton: false,
        singleUploadAutoClose: true,
        showPoweredBy: false,
      }}
    >
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open();
        }
        return (
          <button
            className="button w-24 h-24 grid place-content-center rounded-lg bg-gray-200 text-gray-500 cursor-pointer"
            onClick={handleOnClick}
          >
            <BsUpload className="mx-auto" fontWeight={"bolder"} stroke="3px" />
            {buttonText}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
