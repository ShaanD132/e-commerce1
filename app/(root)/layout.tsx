import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const billboard = await prismadb.billboard

  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  if (store) {
    //redirect to page of specific store ID. The [storeid] folder
    //allows us to create a dashboard for all stores
    redirect(`/${store.id}`)
  }

  return (
    <>
    {children}
    </>
  )
}