import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product.";
import { NextResponse } from "next/server";

async function handler(req, res) {
  const data = await req.json();
  await mongooseConnect()
  const result = await Product.create(data);
  console.log(result);
  return NextResponse.json({ result }, { status: 201 });
}

export { handler as POST };
