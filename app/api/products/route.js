import { NextResponse } from "next/server";

async function handler(req, res) {
  const data = await req.json();
  
  // return NextResponse.json(data, { status: 201 });
  return NextResponse.json({ data }, { status: 201 });
}

export { handler as POST };
