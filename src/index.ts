import "reflect-metadata";
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { PrismaClient } from "@prisma/client";
import { createSchema } from "./schema";
import jwt from "jsonwebtoken";
import { middleware } from "./lib/middleware";

const prisma = new PrismaClient();
const loggedUser = (req: YogaInitialContext) => {
  const token = req.request.headers.get("authorization");

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.APP_SECRET as string);
  } catch (error) {
    return "Session Expired";
  }
}

async function startServer() {
  const schema = await createSchema();

  const yoga = createYoga({
    schema,
    context: (req: YogaInitialContext) => {
      return {
        prisma,
        me: loggedUser(req),
      };
    },
  });

  const server = createServer(yoga);
  server.on("request", (req: IncomingMessage, res: ServerResponse) => {
    middleware.forEach((fn) => fn(req, res, () => {}));
  });
  const PORT = process.env.PORT || 4000;

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});


