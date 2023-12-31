import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    //use Clerk to authenticate form submit
    const { userId } = auth()
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name Required", { status:  400})
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    return NextResponse.json(store);

  } catch(error) {
    //Displaying any errors we get in this part of the code
    console.log("[STORES_POST]", error);
    //return what we need to, using NextResponse
    return new NextResponse("Internal error", { status: 500 });
  }
}