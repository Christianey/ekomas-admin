import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product.";
import { NextResponse } from "next/server";

async function handler(req, res) {
  const product = await req.json();
  await mongooseConnect()
  const data = await Product.create(product);
  
  return NextResponse.json({ data }, { status: 201 });
}

export { handler as POST };
