import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product.";
import { NextResponse } from "next/server";

mongooseConnect();

async function handlePOST(req) {
  const product = await req.json();
  const data = await Product.create(product);

  return NextResponse.json({ data }, { status: 201 });
}

async function handleGET(req) {
  let data;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    data = await Product.findById(id);
  } else {
    data = await Product.find();
  }

  return NextResponse.json({ data }, { status: 200 });
}

async function handlePUT(req) {
  const { _id: id, ...product } = await req.json();
  const data = await Product.findByIdAndUpdate(id, product);
  console.log({ data });

  return NextResponse.json({ data }, { status: 200 });
}

async function handleDELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const data = await Product.findByIdAndDelete(id);

  return NextResponse.json({ data }, { status: 200 });
}

export {
  handlePOST as POST,
  handleGET as GET,
  handlePUT as PUT,
  handleDELETE as DELETE,
};
