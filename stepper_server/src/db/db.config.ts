
import { PrismaClient } from "@prisma/client";

// Creating a new instance of PrismaClient with logging options enabled
// The log option allows capturing various events (queries, info, warnings, and errors) for better debugging and monitoring.
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });


 // Exporting the PrismaClient instance for use in other parts of the application
export default prisma;



