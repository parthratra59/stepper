
import { PrismaClient } from "@prisma/client";

// Creating a new instance of PrismaClient
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });


 
export default prisma;



