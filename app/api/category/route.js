import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Category from "../models/Category";

mongooseConnect();

async function handlePOST(req) {
  const category = await req.json();
  console.log({ category });
  const data = await Category.create(category);

  return NextResponse.json({ data }, { status: 201 });
}

async function handleGET(req) {
  let data;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    data = await Category.findById(id);
  } else {
    data = await Category.find().populate("parent");
  }

  return NextResponse.json(data, { status: 200 });
}

async function handlePUT(req) {
  const { _id: id, ...category } = await req.json();
  const data = await Category.findByIdAndUpdate(id, category);

  return NextResponse.json(data, { status: 200 });
}

async function handleDELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const data = await Category.findByIdAndDelete(id);

  return NextResponse.json({ data }, { status: 200 });
}

export {
  handlePOST as POST,
  handleGET as GET,
  handlePUT as PUT,
  handleDELETE as DELETE,
};
