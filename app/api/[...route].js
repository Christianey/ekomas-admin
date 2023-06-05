import { NextResponse } from "next/server";

const { mongooseConnect } = require("@/lib/mongoose");

async function handlerALL() {
  console.log("handler Allll")
 await mongooseConnect()

 console.log("connecting to database from handler all")
 NextResponse.next()
}

export {handlerALL as GET, handlerALL as POST, handlerALL as PUT, handlerALL as PATCH, handlerALL as DELETE }