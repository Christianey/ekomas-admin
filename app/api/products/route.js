import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product.";
import { NextResponse } from "next/server";

async function handlePOST(req, res) {
  await mongooseConnect();
  const product = await req.json();
  const data = await Product.create(product);

  return NextResponse.json({ data }, { status: 201 });
}

async function handleGET(req, res) {
  await mongooseConnect();
  const data = await Product.find();

  return NextResponse.json({ data }, { status: 201 });
}

export { handlePOST as POST, handleGET as GET };
