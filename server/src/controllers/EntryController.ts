import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EntryController = {
  getAll: async () => {
    const entries = await prisma.alert.findMany({});
    return entries;
  },
};

export default EntryController;
