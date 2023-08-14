import {PrismaClient} from "@prisma/client"

//added so that global has prisma var
declare global {
  var prisma: PrismaClient | undefined
};

const prismadb = globalThis.prisma || new PrismaClient();
//setting prismadb either to current prismaClient or new prismaClient
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;