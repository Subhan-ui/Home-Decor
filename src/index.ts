import "reflect-metadata";
import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { createSchema } from "./schema";

const prisma = new PrismaClient();

async function startServer() {
  const schema = await createSchema();

  const yoga = createYoga({
    schema,
    context: () => ({
      prisma,
    }),
  });

  const server = createServer(yoga);
  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
