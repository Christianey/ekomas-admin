import busboy from "busboy";
import { NextResponse, NextRequest } from "next/server";
import { Form } from "multiparty";

async function handleUpload(req, res) {
  console.log("handling upload");
  try {
    const form = new Form();
    // const reqHeadersList = Object.fromEntries(req.headers);
    // let formData = await req.formData();
    // let body = Object.fromEntries(formData);

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    console.log("length", { files, fields });

    return NextResponse.json({ hello: "hello" });
  } catch (error) {
    console.log(error);
    NextResponse.json(error);
  }
}

export { handleUpload as POST };
